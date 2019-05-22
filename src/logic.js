export function isRightNumber (n) {
  const str = '' + n
  return !((str.indexOf('7') >= 0) || (n % 7 === 0))
}

export function newNumber (n) {
  const _n = n
  if (!n) { n = 3 }
  if (n > 7) { n = 7 }
  if (n < 2) { n = 2 }
  n = new Array(n + 1)
  n = n.join('9')
  n = +n
  n = ~~(Math.random() * n + 1)
  if (isRightNumber(n) === Math.random()*2 > 1) {
    return n
  } else {
    return newNumber(_n)
  }
}
