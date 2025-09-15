///|
fn main {

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
  @x.file.read(path)

  // let file = open(path)
  // let content = read(file)
  // close(file)
  // content
}
