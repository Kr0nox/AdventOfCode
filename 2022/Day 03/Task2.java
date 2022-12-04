import java.io.File;
import java.util.*;

public class Task2{

    public static void main(String[] args) {

        try {
            File file = new File("input.txt");
            Scanner scanner = new Scanner(file);
            String line1;
            String line2;
            String line3;
            long sum = 0;
            Set<Character> firstBag = new HashSet<>();
            Set<Character> secondBag = new HashSet<>();
            while (scanner.hasNext()) {
                firstBag.clear();
                secondBag.clear();
                line1 = scanner.nextLine();
                line2 = scanner.nextLine();
                line3 = scanner.nextLine();
                for (char symbol : line1.toCharArray()) {
                    firstBag.add(symbol);
                }
                for (char symbol : line2.toCharArray()) {
                    secondBag.add(symbol);
                }
                for (char symbol : line3.toCharArray()) {
                    if (firstBag.contains(symbol) && secondBag.contains(symbol)) {
                        sum += getPriority(symbol);
                        break;
                    }
                }
            }
            System.out.println(sum);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

    static int getPriority(char symbol) {
        if (Character.toUpperCase(symbol) == symbol) {
            return symbol - 'A' + 27;
        } else {
            return symbol  - 'a' + 1;
        }
    }
}


