import java.io.File;
import java.util.*;

public class Task2 {

    static char[] input;
    public static void main(String[] args) {

        try {
            File file = new File("input.txt");
            Scanner scanner = new Scanner(file);
            input = scanner.nextLine().toCharArray();
            for (int i = 0; i < input.length; i++) {
                if (isDifferent(i)) {
                    System.out.println(i+14);
                    return;
                }
            }
            System.out.println("Not found");
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

    static boolean isDifferent(int from) {
        if (from + 14 >= input.length) return false;
        for (int i = from; i < from + 14; i++) {
            for (int j = i + 1; j < from + 14; j++) {
                if (input[i] == input[j]) return false;
            }
        }
        return true;
    }

}


