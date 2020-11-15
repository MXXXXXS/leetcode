export default <T>(arr: Array<Array<T>>, getter: (_: T) => any) => {
  for (let indexR = 0; indexR < arr.length; indexR++) {
    const element = arr[indexR];

    console.log(element.map((val) => getter(val)))
  }
}