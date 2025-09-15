///|
fn main {
  read_file("cmd/main/main.mbt")
}

///|
fn learning() -> Unit {
  test_thing()
  println(@lib.fib(20))
  let a : Int = 10
  let b = 20
  println(a + b)
  let mut c = 10
  c = c + 1
  println(c)
  let d = 20
  // d = d + 1
  println(d)
}

///|
/// comment
fn test_thing() -> Unit {
  println("test")
}

///|
fn read_file(path : String) -> Unit {
  try {
    let b = @fs.read_file_to_string(path)
    println(b)
  } catch {
    e => println("Error: \{e}")
  }

  // let file = open(path)
  // let content = read(file)
  // close(file)
  // content
}
