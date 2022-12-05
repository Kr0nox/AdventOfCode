import java.io.File;
import java.util.*;

public class Task2 {

    static ArrayList<Stack<Character>> stacks = new ArrayList<>();
    public static void main(String[] args) {

        try {
            File file = new File("input.txt");
            Scanner scanner = new Scanner(file);
            String line;
            List<String> lines = new ArrayList<>();
            while (scanner.hasNext()) {
                line = scanner.nextLine();
                if ((line.charAt(1) + "").matches("[0-9]")) {
                    break;
                } else {
                    lines.add(line);
                }
            }
            for(int i = 0; i < (lines.get(lines.size() - 1).length()+1)/4; i++) {
                stacks.add(new Stack<>());
            }
            for (int i = lines.size() - 1;  i >= 0; i--) {
                processLine(lines.get(i));
            }
            do {
                line = scanner.nextLine();
            } while  (line.isBlank() && scanner.hasNext());
            do {
                move(line);
                line = scanner.nextLine();
            } while (scanner.hasNext());
            String[] moves = line.split(" ");
            move(line);
            for (Stack<Character> stack : stacks) {
                System.out.print(stack.peek());
            }
            System.out.println();
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

    static void processLine(String line) {
        int curStack = 0;
        for (int i = 0; i < line.length(); i++) {
            char c = line.charAt(i);
            if (c == ' ') {i+=3; curStack++; continue;}
            i++;
            stacks.get(curStack).push(line.charAt(i));
            i+=2;
            curStack++;
        }
    }

    static void move(String move) {
        String[] moves = move.split(" ");
        int from = Integer.parseInt(moves[3])-1;
        int to = Integer.parseInt(moves[5])-1;
        int count = Integer.parseInt(moves[1]);
        Stack<Character> fromStack = stacks.get(from);
        Stack<Character> toStack = stacks.get(to);
        Stack<Character> craneStorage = new Stack<>();
        for (int i = 0; i < count && !fromStack.isEmpty(); i++) {
            craneStorage.push(fromStack.pop());
        }
        while (!craneStorage.isEmpty()) {
            toStack.push(craneStorage.pop());
        }
    }

}


