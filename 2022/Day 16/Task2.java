import java.io.File;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

public class Task2 {

    static Pattern INPUT_REGEX = Pattern.compile("Valve([A-Z]{2}).*rate=(\\d+).*valve(?:s?)((?:[A-Z]{2}|,)*)");
    static Map<String, List<String>> adj = new HashMap<>();
    static Map<String, Integer> rate = new HashMap<>();
    static int MAX_TIME = 26;
    static List<TempResult>[] dp = new ArrayList[MAX_TIME + 3];
    static Set<String> valid;


    public static void main(String[] args) {
        List<Matcher> input = new ArrayList<>();
        try {
            File file = new File("input.txt");
            Scanner scanner = new Scanner(file);
            while (scanner.hasNextLine()) {
                String line = scanner.nextLine().replaceAll(" ", "");
                Matcher matcher = INPUT_REGEX.matcher(line);
                if (matcher.matches()) {
                    input.add(matcher);
                }
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

        for (Matcher matcher : input) {
            String name = matcher.group(1);
            rate.put(name, Integer.parseInt(matcher.group(2)));
            adj.put(name, Arrays.stream(matcher.group(3).split(",")).toList());
        }
        valid = rate.keySet().stream().filter(x -> rate.get(x) > 0).collect(Collectors.toSet());
        valid.add("AA");

        for (int i = 0; i < dp.length; i++) {
            dp[i] = new ArrayList<>();
        }
        Map<String, Map<String, Integer>> dist = new HashMap<>();
        // calculate distance from each valid to each valid
        for (String from : valid) {
            dist.put(from, bfs(from));
        }

        dp[0].add(new TempResult(0, "AA", new HashSet<>()));

        for (int i = 0; i <= MAX_TIME; i++) {
            for (TempResult from : dp[i]) {
                for (String to : valid) {
                    if (from.last.equals(to)) {
                        continue;
                    }
                    TempResult old = from;
                    if (old.openValves.contains(to)) {
                        continue;
                    }

                    int newTime = i + dist.get(from.last).get(to) + 1;
                    if (newTime > MAX_TIME) {
                        continue;
                    }
                    Set<String> newOpenValves = new HashSet<>(old.openValves);
                    newOpenValves.add(to);
                    TempResult newResult = new TempResult(old.amount + rate.get(to) * (MAX_TIME - newTime), to, newOpenValves);

                    dp[newTime].add(newResult);
                }
            }
        }
        Map<String, TempResult> resultSet = new HashMap<>();
        for (List<TempResult> tempResults : dp) {
            for (TempResult t : tempResults) {
                String rep = getReper(t.openValves);
                if (resultSet.containsKey(rep)) {
                    TempResult old = resultSet.get(rep);
                    if (old.amount < t.amount) {
                        resultSet.put(rep, t);
                    }
                } else {
                    resultSet.put(rep, t);
                }
            }
        }
        System.out.println(resultSet.size());
        List<TempResult> results = resultSet.values().stream().toList();
        int max = 0;
        for (int i = 0; i < results.size(); i++) {
            for (int j = i + 1; j < results.size(); j++) {
                TempResult t = results.get(i);
                TempResult t2 = results.get(j);
                if (noIntersection(t.openValves, t2.openValves)) {
                    int temp = t.amount + t2.amount;
                    if (temp > max) {
                        max = temp;
                    }
                }
            }

        }
        System.out.println(max);
    }

    static String getReper(Set<String> set) {
        List<String> list = new ArrayList<>(set);
        list.sort(String::compareTo);
        return String.join("", list);
    }

    static boolean noIntersection(Set<String> a, Set<String> b) {
        for (String s : a) {
            if (b.contains(s)) {
                return false;
            }
        }
        return true;
    }

    private static Map<String, Integer> bfs(String from) {
        Queue<String> queue = new LinkedList<>();
        queue.add(from);
        Set<String> visited = new HashSet<>();
        visited.add(from);
        Map<String, Integer> dist = new HashMap<>();
        dist.put(from, 0);
        while (!queue.isEmpty()) {
            String cur = queue.poll();
            for (String next : adj.get(cur)) {
                if (!visited.contains(next)) {
                    visited.add(next);
                    dist.put(next, dist.get(cur) + 1);
                    queue.add(next);
                }
            }
        }
        return dist;
    }


    static class TempResult {
        int amount = 0;
        String last;
        Set<String> openValves = new HashSet<>();

        public TempResult(int amount, String last, Set<String> openValves) {
            this.amount = amount;
            this.last = last;
            this.openValves = new HashSet<>(openValves);
        }
    }
}


