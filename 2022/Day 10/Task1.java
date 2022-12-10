import java.io.File;
import java.util.*;

public class Task1 {

    static int step = 0;
    static int register = 1;
    static int sum;

    public static void main(String[] args) {

        try {
            File file = new File("input.txt");
            Scanner scanner = new Scanner(file);
            while (scanner.hasNextLine()) {
                String input = scanner.nextLine();
                String[] inputArray = input.split(" ");
                Task.getTask(inputArray).execute();
            }
            System.out.println(sum);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }


    static void increaseStep() {
        step++;
        if ((step - 20)%40 == 0) {
            sum += step * register;
        }
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


