import java.io.File;
import java.math.BigInteger;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

public class Task1 {

    static DirectoryItem root;

    public static void main(String[] args) {

        try {
            File file = new File("input.txt");
            Scanner scanner = new Scanner(file);
            String input = scanner.nextLine();
            root = new DirectoryItem("/");
            input = scanner.nextLine();
            DirectoryItem curDir = root;
            while (scanner.hasNextLine()) {
                String[] split = input.split(" ");
                switch (split[1]) {
                    case "cd" -> {
                        for (Item item : curDir.children) {
                            if (item.name.equals(split[2])) {
                                curDir = (DirectoryItem) item;
                                break;
                            }
                        }
                        if (split[2].equals("..")) {
                            curDir = (DirectoryItem) curDir.parent;
                        }
                        input = scanner.nextLine();
                    }
                    case "ls" -> {
                        input = scanner.nextLine();
                        while (scanner.hasNext()) {
                            String[] split1 = input.split(" ");
                            Item newItem;
                            if(split1[0].equals("$")) {break;}
                            if (split1[0].equals("dir")) {
                                newItem = new DirectoryItem(split1[1]);
                                curDir.addItems(newItem);
                            } else {
                                newItem = new FileItem(split1[1], new BigInteger(split1[0]));
                                curDir.addItems(newItem);
                                addSize(newItem, new BigInteger(split1[0]));
                            }
                            input = scanner.nextLine();

                        }
                    }
                }
            }
            List<DirectoryItem> items = getDirectoriesSmallerThan(root, new BigInteger("100000"));
            System.out.println(sumDirectories(items));
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

    static BigInteger sumDirectories(List<DirectoryItem> items) {
        return items.stream().map(item -> item.size).reduce(BigInteger.ZERO, BigInteger::add);
    }

    static List<DirectoryItem> getDirectoriesSmallerThan(DirectoryItem cur, BigInteger k) {
        List<DirectoryItem> result = new ArrayList<>();
        if (cur.size.compareTo(k) <= 0) {
            result.add(cur);
        }
        result.addAll(cur.children.stream().filter(item -> item instanceof DirectoryItem).map(item -> (DirectoryItem) item).flatMap(item -> getDirectoriesSmallerThan(item, k).stream()).toList());
        return result;
    }

    private static void addSize(Item item, BigInteger sizeToAdd) {
        if (item.parent != null) {
            item.parent.size = item.parent.size.add(sizeToAdd);
            addSize(item.parent, sizeToAdd);
        }
    }

    private static abstract class Item {
        String name;
        BigInteger size;
        Item parent;

        public Item(String name) {
            this.name = name;
            this.size = BigInteger.ZERO;
        }
    }

    private static class DirectoryItem extends Item {

        List<Item> children = new ArrayList<>();

        public DirectoryItem(String name) {
            super(name);
        }

        void addItems(Item item) {
            children.add(item);
            item.parent = this;
        }

    }

    private static class FileItem extends Item {

        public FileItem(String name, BigInteger size) {
            super(name);
            this.size = size;
        }
    }
}


