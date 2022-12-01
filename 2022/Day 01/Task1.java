import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class Task1 {
    public static void main(String[] args) {
        List<Long> list = new ArrayList<Long>();
        try {
            File file = new File("input.txt");
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
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        }

        Long longest = 0L;
        for (Long number : list) {

            if (number > longest) {
                longest = number;
            }
        }
        System.out.println(longest);
    }
}