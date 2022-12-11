import java.io.File;
import java.util.*;

public class Task2 {

    static List<Monkey> monkeys = new ArrayList<>();
    static List<String> input = new ArrayList<>();
    static long lcm;

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
        lcm = lcm_of_array_elements(monkeys.stream().mapToLong(m -> m.testValue).toArray());
        for (int i = 0; i < 10000; i++) {
            for (Monkey monkey : monkeys) {
                monkey.handleItems();
            }
        }

        long largest = 0;
        long secondLargest = 0;
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
        long testValue;
        int trueMonkey;
        int falseMonkey;
        long inspectionCount = 0;

        public Monkey(int startLine) {
            String itemLine = input.get(startLine).substring(14);
            String[] items = itemLine.split(",");
            this.items = new ArrayList<>(Arrays.stream(items).mapToLong(Long::parseLong).mapToObj(Item::new).toList());
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
            this.testValue = Long.parseLong(testLine.substring(16));
            this.trueMonkey = Integer.parseInt(input.get(startLine + 3).split("monkey")[1]);
            this.falseMonkey = Integer.parseInt(input.get(startLine + 4).split("monkey")[1]);
        }

        void handleItems() {
            int itemCount = items.size();
            for (Item item : items) {
                operation.execute(item);
                item.worry = item.worry % lcm;
                if (item.worry % testValue == 0) {
                    monkeys.get(trueMonkey).items.add(item);
                } else {
                    monkeys.get(falseMonkey).items.add(item);
                }

            }
            inspectionCount += itemCount;
            items.clear();
        }
    }

    static class Item {
        long worry;
        Item(long worry) {
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
            i.worry = (long) Math.pow(i.worry, x);
        }
    }

    // https://www.geeksforgeeks.org/lcm-of-given-array-elements/
    public static long lcm_of_array_elements(long[] element_array)
    {
        long lcm_of_array_elements = 1;
        long divisor = 2;

        while (true) {
            long counter = 0;
            boolean divisible = false;

            for (int i = 0; i < element_array.length; i++) {

                // lcm_of_array_elements (n1, n2, ... 0) = 0.
                // For negative number we convert into
                // positive and calculate lcm_of_array_elements.

                if (element_array[i] == 0) {
                    return 0;
                }
                else if (element_array[i] < 0) {
                    element_array[i] = element_array[i] * (-1);
                }
                if (element_array[i] == 1) {
                    counter++;
                }

                // Divide element_array by devisor if complete
                // division i.e. without remainder then replace
                // number with quotient; used for find next factor
                if (element_array[i] % divisor == 0) {
                    divisible = true;
                    element_array[i] = element_array[i] / divisor;
                }
            }

            // If divisor able to completely divide any number
            // from array multiply with lcm_of_array_elements
            // and store into lcm_of_array_elements and continue
            // to same divisor for next factor finding.
            // else increment divisor
            if (divisible) {
                lcm_of_array_elements = lcm_of_array_elements * divisor;
            }
            else {
                divisor++;
            }

            // Check if all element_array is 1 indicate
            // we found all factors and terminate while loop.
            if (counter == element_array.length) {
                return lcm_of_array_elements;
            }
        }
    }
}


