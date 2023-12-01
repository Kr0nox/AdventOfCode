module Task where

import Data.List (isPrefixOf)
import Data.Char (isDigit)

taskOne :: [String] -> String
taskOne input = show (foldl (+) 0 (map getLineNumber1  (input)))

taskTwo :: [String] -> String
taskTwo input = show (foldl (+) 0 (map getLineNumber2  (input)))

getNumbers :: [Char] -> [Integer]
getNumbers ls = map convert (filter isDigit ls)

convert :: Char -> Integer
convert x = read [x]

getFirst ::  [Integer] -> Integer
getFirst [] = error "NO"
getFirst (x:xs) = x

getLast :: [Integer] -> Integer
getLast [] = error "HOW"
getLast (x:[]) = x
getLast (x:xs) = getLast xs

getLineNumber1:: [Char] -> Integer
getLineNumber1 ls = 10 * (getFirst nums) + (getLast nums)
  where nums = (getNumbers ls)

getLineNumber2:: [Char] -> Integer
getLineNumber2 ls = 10 * (getFirst nums) + (getLast nums)
  where nums = (getNextNumber ls)

numberStrings = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]

getNextNumber :: String -> [Integer]
getNextNumber [] = []
getNextNumber (x:xs) =
  let stringNum = (getStringNumber (x:xs)) in 
    if isDigit x then (convert x):(getNextNumber xs)
    else if stringNum > -1 then stringNum:(getNextNumber xs )
    else getNextNumber xs

getStringNumber :: String -> Integer
getStringNumber ls = getStringHelper ls numberStrings 1
  where getStringHelper [] x c = -1
        getStringHelper ls [] c = -1
        getStringHelper ls (x:xs) c = if (isPrefixOf x ls) then c else getStringHelper ls xs (c+1)