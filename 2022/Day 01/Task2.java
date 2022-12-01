import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class Task2 {
    public static void main(String[] args) {
        List<Long> list = new ArrayList<Long>();
        try {
            File file = new File("C:\\Users\\alexa\\Projects\\IdeaProjects\\AdventOfCode2022\\src\\input.txt");
            Scanner scanner = new Scanner(file);
            long sum = 0;
            while (scanner.hasNext()) {
                String line = "";
                line = scanner.nextLine();
                if (line.isBlank()) {
                    list.add(sum);
                    sum = 0;
                    continue;
                }
                sum += Long.parseLong(line);
            }
            list.add(sum);
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        }

        long longest = 0L;
        long secondLongest = 0L;
        long thirdLongest = 0L;
        for (Long number : list) {

            if (number > longest) {
                thirdLongest = secondLongest;
                secondLongest = longest;
                longest = number;
            } else if (number > secondLongest) {
                thirdLongest = secondLongest;
                secondLongest = number;
            } else if (number > thirdLongest) {
                thirdLongest = number;
            }
        }
        System.out.println(longest + secondLongest + thirdLongest);
    }
}