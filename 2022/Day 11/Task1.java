import java.io.File;
import java.util.*;

public class Task1 {

    static List<Monkey> monkeys = new ArrayList<>();
    static List<String> input = new ArrayList<>();

    public static void main(String[] args) {
        try {
            File file = new File("input.txt");
            Scanner scanner = new Scanner(file);
            while (scanner.hasNextLine()) {
                input.add(scanner.nextLine().replaceAll(" ", ""));
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        for (int i = 1; i < input.size(); i += 7) {
            monkeys.add(new Monkey(i));
        }
        for (int i = 0; i < 20; i++) {
            for (Monkey monkey : monkeys) {
                monkey.handleItems();
            }
        }

        int largest = 0;
        int secondLargest = 0;
        for (Monkey monkey : monkeys) {
            if (monkey.inspectionCount > largest) {
                secondLargest = largest;
                largest = monkey.inspectionCount;
            } else if (monkey.inspectionCount > secondLargest) {
                secondLargest = monkey.inspectionCount;
            }
        }
        System.out.println(largest * secondLargest);
    }

    static class Monkey {
        List<Item> items = new ArrayList<>();
        Operation operation;
        int testValue;
        int trueMonkey;
        int falseMonkey;
        int inspectionCount = 0;

        public Monkey(int startLine) {
            String itemLine = input.get(startLine).substring(14);
            String[] items = itemLine.split(",");
            this.items = new ArrayList<>(Arrays.stream(items).mapToInt(Integer::parseInt).mapToObj(Item::new).toList());
            String operationLine = input.get(startLine + 1);
            char operation = operationLine.charAt(17);
            if (operationLine.substring(18).equals("old")) {
                this.operation = new Power(2);
            } else {
                int v = Integer.parseInt(operationLine.substring(18));
                switch (operation) {
                    case '+' -> this.operation = new AddX(v);
                    case '*' -> this.operation = new TimesX(v);
                }
            }

            String testLine = input.get(startLine + 2);
            this.testValue = Integer.parseInt(testLine.substring(16));
            this.trueMonkey = Integer.parseInt(input.get(startLine + 3).split("monkey")[1]);
            this.falseMonkey = Integer.parseInt(input.get(startLine + 4).split("monkey")[1]);
        }

        void handleItems() {
            int itemCount = items.size();
            for (Item item : items) {
                operation.execute(item);
                item.worry /= 3;
                if (item.worry % testValue == 0) {
                    monkeys.get(trueMonkey).items.add(item);
                } else {
                    monkeys.get(falseMonkey).items.add(item);
                }
            }
            inspectionCount += itemCount;
            if (itemCount > 0) {
                items.subList(0, itemCount).clear();
            }
        }
    }

    static class Item {
        int worry;
        Item(int worry) {
            this.worry = worry;
        }
    }

    static abstract class Operation {
        int x;

        Operation(int x) {
            this.x = x;
        }

        abstract void execute(Item i);
    }

    static class AddX extends Operation {
        AddX(int x) {
            super(x);
        }

        @Override
        void execute(Item i) {
            i.worry += x;
        }
    }

    static class TimesX extends Operation {
        TimesX(int x) {
            super(x);
        }

        @Override
        void execute(Item i) {
            i.worry *= x;
        }
    }

    static class Power extends Operation {
        Power(int x) {
            super(x);
        }

        @Override
        void execute(Item i) {
            i.worry = (int) Math.pow(i.worry, x);
        }
    }

}


