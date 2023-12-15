module Task where
import Data.Char (ord)


taskOne :: [String] -> String
taskOne input = show (sum (map hash (getParts (head input))))

taskTwo :: [String] -> String
taskTwo input = "Unimplemented"

getParts :: String -> [String]
getParts ls = o ls "" []
  where
    o "" "" res = res
    o "" cur res = o "" "" res++[cur]
    o (x:xs) cur res = if x == ',' then o xs "" (res++[cur]) else o xs (cur++[x]) res

hash :: String -> Int
hash ls = o ls 0
  where
    o "" acc = acc
    o (x:xs) acc = o xs (((acc+ord x)*17) `mod` 256)