import java.io.File;
import java.util.*;

public class Task2 {

    static int WALL_WIDTH = 7;
    static List<boolean[]> cave = new ArrayList<>();
    static NextPiece nextPiece = NextPiece.HOR_LINE;
    static long highestField = 0;
    static int pointer = 0;
    static char[] input;

    public static void main(String[] args) {
        try {
            File file = new File("input.txt");
            Scanner scanner = new Scanner(file);
            input = scanner.nextLine().toCharArray();
        } catch (Exception e) {
            System.out.println(e.getMessage());
            input = new char[0];
        }

        int preLoopReps = 0;
        while (lowestReachable() == 0) {
            placePiece();
            preLoopReps++;
        }
        for (int i = 0; i < input.length * NextPiece.values().length; i++) {
            placePiece();
            preLoopReps++;
        }
        long preLoopScore = highestField;
        System.out.println("Loop starts at: " + preLoopReps);
        String hashGoal = getHash();
        System.out.println("Hash goal: " + hashGoal);
        //int loopReps = 0;
        NextPiece loopPiece = nextPiece;
        int loopPointer = pointer;
        long timesPerLoop = 0;
        printCave(hashGoal.length() * 2);
        do {
            placePiece();
            timesPerLoop++;
        } while (!getHash().equals(hashGoal) || nextPiece != loopPiece || pointer != loopPointer);
        System.out.println();
        printCave(hashGoal.length() * 2);
        System.out.println("Loop reps: " + timesPerLoop);
        //long timesPerLoop = (long)loopReps *input.length * NextPiece.values().length;
        long postLoopScore = highestField;
        long toDoLoops = (1000000000000L - preLoopReps) / timesPerLoop;
        System.out.println("To do loops: " + toDoLoops);
        long singleOnesLeft = 1000000000000L - timesPerLoop * toDoLoops - preLoopReps;
        System.out.println("Single ones left: " + singleOnesLeft);
        for (int i = 0; i < singleOnesLeft; i++) {
            placePiece();
        }
        long heightFromLoops = (postLoopScore - preLoopScore) * toDoLoops;
        long singleOnesScore = highestField - postLoopScore;
        long totalScore = preLoopScore + heightFromLoops + singleOnesScore;
        System.out.println("Total score: " + totalScore);

    }

    static void placePiece() {
        Piece piece = nextPiece.getPiece((int)highestField + 3);
        while (cave.size() < highestField + 5 + piece.height) {
            cave.add(new boolean[WALL_WIDTH]);
        }
        // move piece
        while (true) {
            if (input[pointer] == '>') {
                if (piece.fitsAt(piece.x+1, piece.y)) {
                    piece.x++;
                }
            } else {
                if (piece.fitsAt(piece.x-1, piece.y)) {
                    piece.x--;
                }
            }
            pointer++;
            if (pointer >= input.length) {
                pointer = 0;
            }
            if (piece.fitsAt(piece.x, piece.y-1)) {
                piece.y--;
            } else {
                break;
            }

        }

        piece.place();

        // update highest field
        while (highestField < cave.size()) {
            boolean[] row = cave.get((int)highestField);
            boolean empty = true;
            for (boolean b : row) {
                if (b) {
                    empty = false;
                    break;
                }
            }
            if (empty) {
                break;
            } else {
                highestField++;
            }
        }

        nextPiece = nextPiece.getNext();
    }

    static String getHash() {
        int heighestRowWithTrueValue = 0;
        for (int i = 0; i < cave.size(); i++) {
            boolean[] row = cave.get(i);
            for (boolean b : row) {
                if (b) {
                    heighestRowWithTrueValue = i;
                    break;
                }
            }
        }

        StringBuilder sb = new StringBuilder();
        int lowestRow = lowestReachable();
        for (int i = lowestRow; i <= heighestRowWithTrueValue; i++) {
            boolean[] row = cave.get(i);
            int rowC = 0;
            for (int j = 0; j < row.length; j++) {
                if (row[j]) {
                    rowC += Math.pow(2, j);
                }
            }
            sb.append("0".repeat(Math.max(0, 3 - (rowC + "").length())));
            sb.append(rowC);
        }

        return sb.toString();
    }


    static int lowestReachable() {
        int lowestRow = 0;
        Set<Integer> reachabelFields = new HashSet<>(List.of(0,1,2,3,4,5,6));
        for (int i = cave.size() - 1; i > 0; i--) {
            boolean[] nextRow = cave.get(i - 1);
            Set<Integer> reachabelFieldsNextRow = new HashSet<>();
            for (int j : reachabelFields) {
                if (!nextRow[j]) {
                    reachabelFieldsNextRow.add(j);
                }
                if (j > 0 && !nextRow[j - 1]) {
                    reachabelFieldsNextRow.add(j - 1);
                }
                if (j < 6 && !nextRow[j + 1]) {
                    reachabelFieldsNextRow.add(j + 1);
                }
            }
            reachabelFields = reachabelFieldsNextRow;
            if (reachabelFields.isEmpty()) {
                lowestRow = i;
                break;
            }
        }
        return lowestRow;
    }

    static void printCave(int lineCount) {
        for (int i = cave.size()-1; i >= Math.max(0, cave.size()-lineCount); i--) {
            boolean[] row = cave.get(i);
            for (boolean b : row) {
                System.out.print(b ? "#" : ".");
            }
            System.out.println();
        }
        System.out.println();
    }

    static abstract class Piece {
        int x,y, height;
        Piece(int x, int y, int height) {
            this.x = x;
            this.y = y;
            this.height = height;
        }

        abstract boolean fitsAt(int x, int y);
        abstract void place();
    }

    static class HorLine extends Piece {
        // anchored
        HorLine(int y) {
            super(2, y,1);
        }

        @Override
        boolean fitsAt(int x, int y) {
            if(x+3 >= WALL_WIDTH || x < 0 || y < 0) {
                return false;
            }
            for (int i = x; i <= x+3; i++){
                if (cave.get(y)[i]) {
                    return false;
                }
            }
            return true;
        }

        @Override
        void place() {
            for (int i = x; i <= x+3; i++){
                cave.get(y)[i] = true;
            }
        }

    }

    static class Plus extends Piece {
        // anchored
        Plus(int y) {
            super(3, y,3);
        }

        @Override
        boolean fitsAt(int x, int y) {
            if (x+1 >= WALL_WIDTH || x-1< 0 || y < 0) {
                return false;
            }
            for (int i = x-1; i <= x+1; i++) {
                if (cave.get(y+1)[i]) {
                    return false;
                }
            }
            for (int i = y; i <= y+2; i++) {
                if (cave.get(i)[x]) {
                    return false;
                }
            }
            return true;
        }

        @Override
        void place() {
            for (int i = x-1; i <= x+1; i++) {
                cave.get(y+1)[i] = true;
            }
            for (int i = y; i <= y+2; i++) {
                cave.get(i)[x] = true;
            }
        }

    }

    static class L extends Piece {
        // anchored
        L(int y) {
            super(2, y,3);
        }

        @Override
        boolean fitsAt(int x, int y) {
            if (x+2 >= WALL_WIDTH || x < 0 || y < 0) {
                return false;
            }
            for (int i = x; i <= x+2; i++) {
                if (cave.get(y)[i]) {
                    return false;
                }
            }
            for (int i = y; i <= y+2; i++) {
                if (cave.get(i)[x+2]) {
                    return false;
                }
            }
            return true;
        }

        @Override
        void place() {
            for (int i = x; i <= x+2; i++) {
                cave.get(y)[i] = true;
            }
            for (int i = y; i <= y+2; i++) {
                cave.get(i)[x+2] = true;
            }
        }

    }

    static class VertLine extends Piece {
        // anchored
        VertLine(int y) {
            super(2, y,4);
        }

        @Override
        boolean fitsAt(int x, int y) {
            if(x >= WALL_WIDTH || x < 0 || y < 0) {
                return false;
            }
            for (int i = y; i <= y+3; i++){
                if (cave.get(i)[x]) {
                    return false;
                }
            }
            return true;
        }

        @Override
        void place() {
            for (int i = y; i <= y+3; i++){
                cave.get(i)[x] = true;
            }
        }
    }

    static class Square extends Piece {
        // anchored
        Square(int y) {
            super(2, y,2);
        }

        @Override
        boolean fitsAt(int x, int y) {
            if (x+1 >= WALL_WIDTH || x < 0  || y < 0) {
                return false;
            }
            for (int i = x; i <= x+1; i++) {
                if (cave.get(y+1)[i]) {
                    return false;
                }
            }
            for (int i = x; i <= x+1; i++) {
                if (cave.get(y)[i]) {
                    return false;
                }
            }
            return true;
        }

        @Override
        void place() {
            for (int i = x; i <= x+1; i++) {
                cave.get(y+1)[i] = true;
            }
            for (int i = x; i <= x+1; i++) {
                cave.get(y)[i] = true;
            }
        }
    }

    enum NextPiece {
        HOR_LINE{
            @Override
            Piece getPiece(int y) {
                return new HorLine(y);
            }

            @Override
            NextPiece getNext() {
                return PLUS;
            }
        },
        PLUS {
            @Override
            Piece getPiece(int y) {
                return new Plus(y);
            }

            @Override
            NextPiece getNext() {
                return L;
            }
        }, L {
            @Override
            Piece getPiece(int y) {
                return new L(y);
            }

            @Override
            NextPiece getNext() {
                return VERT_LINE;
            }
        }, VERT_LINE {
            @Override
            Piece getPiece(int y) {
                return new VertLine(y);
            }

            @Override
            NextPiece getNext() {
                return SQUARE;
            }
        }, SQUARE {
            @Override
            Piece getPiece(int y) {
                return new Square(y);
            }

            @Override
            NextPiece getNext() {
                return HOR_LINE;
            }
        };

        abstract Piece getPiece(int y);
        abstract NextPiece getNext();
    }
}



