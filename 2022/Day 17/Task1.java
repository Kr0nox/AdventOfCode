import java.io.File;
import java.util.*;

public class Task1 {

    static int WALL_WIDTH = 7;
    static List<boolean[]> cave = new ArrayList<>();

    public static void main(String[] args) {
        char[] input;
        try {
            File file = new File("input.txt");
            Scanner scanner = new Scanner(file);
            input = scanner.nextLine().toCharArray();
        } catch (Exception e) {
            System.out.println(e.getMessage());
            input = new char[0];
        }
        NextPiece nextPiece = NextPiece.HOR_LINE;
        int highestField = 0;
        int pointer = 0;
        for(int reps = 0; reps < 2022; reps++) {
            Piece piece = nextPiece.getPiece(highestField + 3);
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
                boolean[] row = cave.get(highestField);
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
        System.out.println(highestField);

    }

    static void printCave() {
        for (int i = cave.size()-1; i >= 0; i--) {
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



