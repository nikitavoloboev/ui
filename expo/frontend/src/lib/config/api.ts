import { QueryClient } from '@tanstack/react-query';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import { createTRPCReact } from '@trpc/react-query';
import { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

import { supabase } from './supabase';

import type { AppRouter } from '../../../../backend/src/trpc/router';
//     👆 **type-only** import

// Figure out the base URL of the API
const isEmulator = !Device.isDevice;
let BASE_URL: string;
if (__DEV__) {
  // if in development mode, use local server
  BASE_URL =
    Platform.OS === 'ios' ? 'http://localhost:3000' : 'http://10.0.2.2:3000'; // simulator for android requires this IP
  BASE_URL = isEmulator ? BASE_URL : 'http://192.168.68.110:3000'; // real device development (change to your local IP)
} else {
  BASE_URL = 'https://localhost:3000'; //TODO: change this for production
}

const TRPC_BASE_URL = `${BASE_URL}/trpc`;

async function getToken() {
  const { data, error } = await supabase.auth.getSession();
  if (error) return undefined;
  if (data.session) {
    return data.session.access_token;
  }
  return undefined;
}

// Pass AppRouter as generic here. 👇 This lets the `trpc` object know
// what procedures are available on the server and their input/output types.
const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: TRPC_BASE_URL,
      async headers() {
        const token = await getToken();
        if (token) {
          return {
            authorization: `Bearer ${token}`,
          };
        }
        return {};
      },
    }),
  ],
});

const trpcQuery = createTRPCReact<AppRouter>();
const trpcQueryClient = trpcQuery.createClient({
  links: [
    httpBatchLink({
      url: TRPC_BASE_URL,
      async headers() {
        const token = await getToken();
        if (token) {
          return {
            Authorization: `Bearer ${token}`,
          };
        }
        return {};
      },
    }),
  ],
});

const queryClient = new QueryClient();

// infer types from tRPC for specific use-cases when the type is required before the trpc function is called
type RouterInput = inferRouterInputs<AppRouter>;
type RouterOutput = inferRouterOutputs<AppRouter>;
export type User = Omit<
  RouterOutput['user']['getCurrentUser'],
  'createdAt' | 'updatedAt'
>;

export { trpc, trpcQuery, trpcQueryClient, queryClient, BASE_URL };
