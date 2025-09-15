import type { AddQuery, CountQuery, GetQuery, ListQuery, Model, RemoveQuery, SetQuery } from "@ronin/compiler";
import type { DeepCallable, ResultRecord } from "@ronin/syntax/queries";
import type { PromiseTuple, QueryHandlerOptions } from "ronin/types";
declare module "ronin" {
    export type User = ResultRecord & {
        email: string;
        name: string;
    };
    export type Users = Array<User> & {
        moreBefore?: string;
        moreAfter?: string;
    };
    declare const get: {
        /* Get a single User record */
        user: DeepCallable<GetQuery[keyof GetQuery], User | null>;
        /* Get multiple User records */
        users: DeepCallable<GetQuery[keyof GetQuery], Users>;
    };
    declare const count: {
        /* Count multiple User records */
        users: DeepCallable<CountQuery[keyof CountQuery], number>;
    };
    declare const set: {
        /* Set a single User record */
        user: DeepCallable<SetQuery[keyof SetQuery], User | null>;
        /* Set multiple User records */
        users: DeepCallable<SetQuery[keyof SetQuery], Users>;
    };
    declare const add: {
        /* Add a single User record */
        user: DeepCallable<AddQuery[keyof AddQuery], User | null>;
    };
    declare const remove: {
        /* Remove a single User record */
        user: DeepCallable<RemoveQuery[keyof RemoveQuery], User | null>;
        /* Remove multiple User records */
        users: DeepCallable<RemoveQuery[keyof RemoveQuery], Users>;
    };
    declare const batch: <TQueries extends [
        Promise,
        ...Array<Promise>
    ] | Array<Promise>>(operations: () => TQueries, queryOptions?: Record<string, unknown>) => Promise<PromiseTuple<TQueries>>;
    declare const list: {
        /* List all model definitions */
        models: DeepCallable<ListQuery[keyof ListQuery], Array<Model>>;
    };
    declare const createSyntaxFactory: (options: QueryHandlerOptions | (() => QueryHandlerOptions)) => {
        get: typeof get;
        count: typeof count;
        set: typeof set;
        add: typeof add;
        remove: typeof remove;
        list: typeof list;
        create: typeof import("ronin").create;
        alter: typeof import("ronin").alter;
        drop: typeof import("ronin").drop;
        batch: typeof import("ronin").batch;
        sql: typeof import("ronin").sql;
        sqlBatch: typeof import("ronin").sqlBatch;
    };
    export default function (options: QueryHandlerOptions | (() => QueryHandlerOptions)): {
        get: typeof get;
        count: typeof count;
        set: typeof set;
        add: typeof add;
        remove: typeof remove;
        list: typeof list;
        create: typeof import("ronin").create;
        alter: typeof import("ronin").alter;
        drop: typeof import("ronin").drop;
        batch: typeof import("ronin").batch;
        sql: typeof import("ronin").sql;
        sqlBatch: typeof import("ronin").sqlBatch;
    };
}
