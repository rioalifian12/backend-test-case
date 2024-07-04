function countDiagonal(matrix) {
  const n = matrix.length;
  let diagonalPertama = 0;
  let diagonalKedua = 0;

  for (let i = 0; i < n; i++) {
    diagonalPertama += matrix[i][i];
    diagonalKedua += matrix[i][n - 1 - i];
  }

  const result = diagonalPertama - diagonalKedua;
  console.log(
    "Maka hasilnya adalah",
    diagonalPertama,
    "-",
    diagonalKedua,
    "=",
    result
  );
  return result;
}

const matrix = [
  [1, 2, 0],
  [4, 5, 6],
  [7, 8, 9],
];

const result = countDiagonal(matrix);
