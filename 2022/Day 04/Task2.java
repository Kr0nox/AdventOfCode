import java.io.File;
import java.util.*;

public class Task2 {

    public static void main(String[] args) {

        try {
            File file = new File("input.txt");
            Scanner scanner = new Scanner(file);
            String line;
            int sum = 0;
            while (scanner.hasNext()) {
                line = scanner.nextLine();
                String[] ranges = line.split(",");
                Range range1 = new Range(ranges[0]);
                Range range2 = new Range(ranges[1]);
                sum += range1.doOverlap(range2) || range2.doOverlap(range1) ? 1 : 0;
            }
            System.out.println(sum);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

    private static class Range {
        int start;
        int end;
        Range(String range) {
            String[] ranges = range.split("-");
            start = Integer.parseInt(ranges[0]);
            end = Integer.parseInt(ranges[1]);
        }

        private boolean containsRange(Range r) {
            return this.start <= r.start && this.end >= r.end;
        }

        private boolean doOverlap(Range r) {
            return this.start <= r.end && this.end >= r.start;
        }
    }

}


