import java.io.File;
import java.util.*;

public class Task1 {

    static int ROW_LENGTH;
    static List<char[]> input = new ArrayList<>();
    static ArrayList<Integer>[] adj;
    static int start;
    static int end;

    public static void main(String[] args) {
        try {
            File file = new File("input.txt");
            Scanner scanner = new Scanner(file);
            while (scanner.hasNextLine()) {
                input.add(scanner.nextLine().toCharArray());
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        ROW_LENGTH = input.get(0).length;
        adj = new ArrayList[input.size()*ROW_LENGTH];
        for (int i = 0; i < adj.length; i++) {
            adj[i] = new ArrayList<>();
        }
        int sx = 0;
        int sy = 0;
        for (int x = 0; x < input.size(); x++) {
            for (int y = 0; y < ROW_LENGTH; y++) {
                if (input.get(x)[y] == 'S') {
                    start = x*ROW_LENGTH+y;
                    sx = x;
                    sy = y;
                    input.get(x)[y] = 'a';
                } else if (input.get(x)[y] == 'E') {
                    end = x*ROW_LENGTH+y;
                    input.get(x)[y] = 'z';
                }
            }
        }
        buildGraph(sx,sy,'a');
        System.out.println(bfs());
    }

    static void buildGraph(int x, int y, char lastSymbol) {
        if (adj[x*ROW_LENGTH+y].size() > 0) {
            return;
        }
        for (int xi = Math.max(0,x-1); xi <= Math.min(input.size()-1,x+1); xi++) {
            for (int yi = Math.max(0,y-1); yi <= Math.min(ROW_LENGTH-1,y+1); yi++) {
                if (xi == x && yi == y) {
                    continue;
                }
                if (xi != x && yi != y) {
                    continue;
                }
                if (input.get(xi)[yi] <= lastSymbol+1) {
                    adj[x*ROW_LENGTH+y].add(xi*ROW_LENGTH+yi);
                    buildGraph(xi, yi, input.get(xi)[yi]);
                }
            }
        }
    }

    static int bfs() {
        int[] dist = new int[adj.length];
        Arrays.fill(dist, Integer.MAX_VALUE);
        dist[start] = 0;
        Queue<Integer> q = new LinkedList<>();
        q.add(start);
        while (!q.isEmpty()) {
            int u = q.poll();
            for (int v : adj[u]) {
                if (dist[v] == Integer.MAX_VALUE) {
                    dist[v] = dist[u] + 1;
                    q.add(v);
                }
            }
        }
        return dist[end];
    }

}


