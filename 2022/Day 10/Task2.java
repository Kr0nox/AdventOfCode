import java.io.File;
import java.util.*;

public class Task2 {

    static int step = 0;
    static int register = 1;
    static List<char[]> display = new ArrayList<>();


    public static void main(String[] args) {

        try {
            File file = new File("input.txt");
            Scanner scanner = new Scanner(file);
            while (scanner.hasNextLine()) {
                String input = scanner.nextLine();
                String[] inputArray = input.split(" ");
                Task.getTask(inputArray).execute();
            }
            for (char[] row : display) {
                for (char c : row) {
                    System.out.print(c);
                }
                System.out.println();
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }


    static void increaseStep() {
        if ((step)%40 == 0) {
            display.add(new char[40]);
            step = 0;
        }
        if (step + 1 >= register && step +  1 <= register + 2) {
            display.get(display.size() - 1)[step] = '#';
        } else {
            display.get(display.size() - 1)[step] = '.';
        }
        step++;

    }

    static abstract class Task {

        protected int[] attr;

        private Task(int[] attr) {
            this.attr = attr;
        }

        static Task getTask(String[] splits) {
            switch (splits[0]) {
                case "addx" -> {return new AddX(Integer.parseInt(splits[1]));}
                case "noop" -> {return new Noop();}
            }
            return null;
        }

        abstract void execute();

    }

    static class AddX extends Task {

        private AddX(int attr) {
            super(new int[]{attr});
        }

        @Override
        void execute() {
            increaseStep();
            increaseStep();
            register += attr[0];
        }
    }

    static class Noop extends Task {

        private Noop() {
            super(new int[]{});
        }

        @Override
        void execute() {
            increaseStep();
        }
    }

}


