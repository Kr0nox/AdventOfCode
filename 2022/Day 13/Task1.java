import java.io.File;
import java.util.*;

public class Task1 {

    static List<String> input = new ArrayList<>();

    public static void main(String[] args) {
        try {
            File file = new File("input.txt");
            Scanner scanner = new Scanner(file);
            while (scanner.hasNextLine()) {
                input.add(scanner.nextLine());
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        List<Pair> pairs = new ArrayList<>();
        for (int i = 0; i < input.size(); i += 3) {
            Pair p = new Pair();
            p.first = parseList(input.get(i));
            p.second = parseList(input.get(i+1));
            pairs.add(p);
        }

        int sum = 0;
        for (int i = 0; i < pairs.size(); i++) {
            if (comparePair(pairs.get(i)) == -1) {
                sum += i+1;
            }
        }
        System.out.println(sum);
    }

    static int comparePair(Pair p) {
        if (p.first instanceof ListLeaf && p.second instanceof ListLeaf) {
            int f = ((ListLeaf)p.first).value;
            int s = ((ListLeaf)p.second).value;
            return Integer.compare(f, s);
        }
        if (p.first instanceof ListNode && p.second instanceof ListNode) {
            ListNode f = (ListNode)p.first;
            ListNode s = (ListNode)p.second;
            for (int i = 0; i < Math.min(f.children.size(), s.children.size()); i++) {
                Pair p2 = new Pair();
                p2.first = f.children.get(i);
                p2.second = s.children.get(i);
                int res = comparePair(p2);
                if (res != 0) {
                    return res;
                }
            }
            return Integer.compare(f.children.size(), s.children.size());
        }
        Pair p2 = new Pair();
        if (p.first instanceof ListNode) {
            p2.first = p.first;
            ListNode n = new ListNode();
            n.children.add(p.second);
            p2.second = n;
        } else {
            ListNode n = new ListNode();
            n.children.add(p.first);
            p2.first = n;
            p2.second = p.second;
        }
        return comparePair(p2);
    }

    static class Pair {
        ListComponent first;
        ListComponent second;

    }

    static ListNode parseList(String s) {
        ListNode l = new ListNode();
        String contentS = s.substring(1,s.length()-1).replace(" ","");
        if (contentS.length() == 0) {
            return l;
        }

        do {
            if (contentS.charAt(0) == '[') {
                int openCount = 1;
                int index = 1;
                while (openCount > 0) {
                    openCount += contentS.charAt(index) == '[' ? 1 : 0;
                    openCount -= contentS.charAt(index) == ']' ? 1 : 0;
                    index++;
                }
                l.children.add(parseList(contentS.substring(0, index)));

                if (index + 1 >= contentS.length()) {
                    contentS = "";
                } else {
                    contentS = contentS.substring(index + 1);
                }
            }  else {
                int index = 0;
                while (index < contentS.length() && contentS.charAt(index) != ',') {
                    index++;
                }
                l.children.add(new ListLeaf(Integer.parseInt(contentS.substring(0, index))));
                if (index + 1 >= contentS.length()) {
                    contentS = "";
                } else {
                    contentS = contentS.substring(index + 1);
                }
            }
        } while (contentS.length() > 0);

        return l;
    }

    static interface ListComponent {}

    static class ListLeaf implements ListComponent {
        int value;

        ListLeaf(int value) {
            this.value = value;
        }
    }

    static class ListNode implements ListComponent {
        List<ListComponent> children = new ArrayList<>();

        public ListNode() {}

    }

}


