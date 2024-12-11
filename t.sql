-- (Easy) Basic variable manipulation
-- Q1 What should be the output for x and y? 
BEGIN
  SET x TO 5
  SET y TO 10
  SET z TO x + y
  SET x TO z - y
  SET y TO z - x
  PRINT x
  PRINT y
END
/* 
  Step-by-step breakdown:

  z = x + y = 5 + 10 = 15  
  x = z - y = 15 - 10 = 5  
  y = z - x = 15 - 5 = 10  

  Output:
  5  
  10
*/

-- (Medium) List manipulation, conditionals, and loops 
-- Q2 What should be the output for the result?
BEGIN
  SET numbers TO [3, 1, 4, 1, 5, 9]
  SET result TO 0

  FOR i FROM 1 TO LENGTH(numbers)
    IF i MOD 2 = 0 THEN
      SET result TO result + numbers[i]
    ELSE
      SET result TO result - numbers[i]
    END IF
  NEXT i

  PRINT result
END
/*
  Step-by-step breakdown:

  1. Initialize numbers = [3, 1, 4, 1, 5, 9], result = 0
  2. Iterate through each index (1-based indexing):
    i = 1: result = 0 - 3 = -3
    i = 2: result = -3 + 1 = -2
    i = 3: result = -2 - 4 = -6
    i = 4: result = -6 + 1 = -5
    i = 5: result = -5 - 5 = -10
    i = 6: result = -10 + 9 = -1

  Output: -1
*/

-- (Hard) Nested loops, matrix traversal, and modular arithmetic 
-- Q3 What should be the output of total?
BEGIN
  SET matrix TO [[2, 3, 1], [5, 4, 6], [9, 8, 7]]
  SET total TO 0

  FOR i FROM 1 TO 3
    FOR j FROM 1 TO 3
      IF (i + j) MOD 2 = 0 THEN
        SET total TO total + matrix[i][j]
      ELSE
        SET total TO total - matrix[i][j]
      END IF
    NEXT j
  NEXT i

  PRINT total
END
/* 
  Step-by-step calculation:

  1. Initialize matrix = [[2, 3, 1], [5, 4, 6], [9, 8, 7]] and total = 0
  2. Use a nested loop to go through each i (row) and j (column)
    - (i + j) MOD 2 = 0 → Add matrix[i][j] to total
    - Otherwise → Subtract matrix[i][j] from total
  
  Step-by-step breakdown:
  +---+---+-----+-----------+---------------+------------+-------+
  | i | j | i+j | (i+j)MOD2 | matrix[i][j] | Operation  | Total |
  +---+---+-----+-----------+---------------+------------+-------+
  | 1 | 1 |   2 |         0 |             2 | +          |     2 |
  | 1 | 2 |   3 |         1 |             3 | -          |    -1 |
  | 1 | 3 |   4 |         0 |             1 | +          |     0 |
  | 2 | 1 |   3 |         1 |             5 | -          |    -5 |
  | 2 | 2 |   4 |         0 |             4 | +          |    -1 |
  | 2 | 3 |   5 |         1 |             6 | -          |    -7 |
  | 3 | 1 |   4 |         0 |             9 | +          |     2 |
  | 3 | 2 |   5 |         1 |             8 | -          |    -6 |
  | 3 | 3 |   6 |         0 |             7 | +          |     1 |
  +---+---+-----+-----------+---------------+------------+-------+

  Output: 1
*/