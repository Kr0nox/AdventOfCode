import java.io.File;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

public class Task1 {

    static Pattern INPUT_REGEX = Pattern.compile("Valve([A-Z]{2}).*rate=(\\d+).*valve(?:s?)((?:[A-Z]{2}|,)*)");
    static Map<String, List<String>> adj = new HashMap<>();
    static Map<String, Integer> rate = new HashMap<>();
    static int MAX_TIME = 30;
    static Map<String, TempResult>[] dp = new HashMap[MAX_TIME + 3];


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
        Set<String> valid = rate.keySet().stream().filter(x -> rate.get(x) > 0).collect(Collectors.toSet());
        valid.add("AA");

        for (int i = 0; i < dp.length; i++) {
            dp[i] = new HashMap<>();
        }
        Map<String, Map<String, Integer>> dist = new HashMap<>();
        // calculate distance from each valid to each valid
        for (String from : valid) {
            dist.put(from, bfs(from));
        }

        dp[0].put("AA", new TempResult(0, new HashSet<>()));
        int max = 0;
        for (int i = 0; i <= MAX_TIME; i++) {
            for (String from : valid) {
                for (String to : valid) {
                    if (from.equals(to)) {
                        continue;
                    }
                    if (!dp[i].containsKey(from)) {
                        continue;
                    }
                    TempResult old = dp[i].get(from);
                    if (old.openValves.contains(to)) {
                        continue;
                    }

                    int newTime = i + dist.get(from).get(to) + 1;
                    if (newTime > MAX_TIME) {
                        continue;
                    }
                    Set<String> newOpenValves = new HashSet<>(old.openValves);
                    newOpenValves.add(to);
                    TempResult newResult = new TempResult(old.amount + rate.get(to) * (MAX_TIME - newTime), newOpenValves);
                    if (dp[newTime].containsKey(to)) {
                        TempResult oldResult = dp[newTime].get(to);
                        if (newResult.amount < oldResult.amount) {
                            newResult = oldResult;
                        }
                    }

                    dp[newTime].put(to, newResult);
                    if (newResult.amount > max) {
                        max = newResult.amount;
                    }
                }
            }
        }
        System.out.println(max);
        System.out.println("End");

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
        Set<String> openValves = new HashSet<>();

        public TempResult(int amount, Set<String> openValves) {
            this.amount = amount;
            this.openValves = new HashSet<>(openValves);
        }
    }
}


