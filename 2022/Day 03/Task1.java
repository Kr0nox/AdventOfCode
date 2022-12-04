import java.io.File;
import java.util.*;

public class Task1 {

    public static void main(String[] args) {

        try {
            File file = new File("input.txt");
            Scanner scanner = new Scanner(file);
            String line;
            long sum = 0;
            Set<Character> firstPocket;
            while (scanner.hasNext()) {
                firstPocket = new HashSet<>();
                line = scanner.nextLine();
                int lineLength = line.length();
                char[] symbols = line.toCharArray();
                for (int i = 0; i < lineLength / 2; i++) {
                    firstPocket.add(symbols[i]);
                }
                for (int i = lineLength / 2; i < lineLength; i++) {
                    if (firstPocket.contains(symbols[i])) {
                        sum += getPriority(symbols[i]);
                        firstPocket.remove(symbols[i]);
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


