#include <iostream>
#include <cstdlib>
#include <ctime>
using namespace std;

int main();
void chosen( int size, int psize, int pcounter, double allboxes[], string names[], double scores[]);
void boxes(int size, int psize, int pcounter, string names[], double scores[]);

// Overall settings for the game
void settings() {

    cout << "How many players would like to play? (MAXIMUM is 4)" << endl;
    int psize;
    int pcounter = 0;
    cin >> psize;
    while (psize > 4 || psize < 1) {
        cout << "Invalid size" << endl;
        cin >> psize;
    }
    string names[5];
    double scores[5];
    cout << "Select the number of mystery boxes(MAXIMUM is 100): " << endl;
    int size;
    cin >> size;
    while (size < 0 || size > 100) {
        cout << "Enter number between 1-100!" << endl;
        cin >> size;
    }
    boxes(size, psize, pcounter, names, scores);

}

// END VOID
void theend() {

    for (int a = 0; a < 3; a++) {
        cout << endl << "GAME ENDED" << endl;
    }
    int end = 1;
    main();
}

// Displays the scores
void scoretables(int size, int psize, int pcounter, double allboxes[], string names[], double scores[]) {

    for (int b = 0; b < psize; b++) {
        cout << endl << names[b] << "'s score is: " << scores[b] << "$" << endl;
    } 
    theend();
}

// Displays the values of the boxes aka score with player names
void score(int size, int psize, int pcounter, double allboxes[], string names[], double scores[]) {

    double score = 0;
    for (int a = 1; a <= size; a++) {
        score = score + allboxes[a];
    }
    cout << "Who was playing?" << endl;
    string name;
    cin >> name;
    names[pcounter] = name;
    scores[pcounter] = score;
    if (pcounter + 1 == psize) {
        scoretables(size, psize, pcounter, allboxes, names, scores);
    }
    if (pcounter == 0) {
        pcounter++;
        cout << endl << "NEXT PLAYER" << endl;
        boxes(size, psize, pcounter, names, scores);
    }
    if (pcounter == 1) {
        pcounter++;
        cout << endl << "NEXT PLAYER" << endl;
        boxes(size, psize, pcounter, names, scores);
    }
    if (pcounter == 2) {
        pcounter++;
        cout << endl << "NEXT PLAYER" << endl;
        boxes(size, psize, pcounter, names, scores);
    }
}

// Generating random array, couting the boxes with values and passing it to void chosen
void boxes(int size, int psize, int pcounter, string names[], double scores[] ) {

    srand(time(0));
    double allboxes[100];

    for (int a = 1; a <= size; a++) {
        double number = 1 + rand() % 100;
        cout << endl << "The box n.o " << a << " has value of: " << number << "$" <<endl;
        allboxes[a] = number;
        
        
    }
    chosen( size, psize, pcounter, allboxes, names, scores);
}

// Takes the box user wants to gamblw with and presents multipliers, values and odds
void chosen(int size, int psize, int pcounter, double allboxes[], string names[], double scores[]) {

    srand(time(0));
    cout << endl << "With what n.o box would You like to gamble with?" << endl;
    int boxnum;
    cin >> boxnum;
    while (boxnum > size) {
        cout << endl << "YOU DO NOT HAVE BOX WITH THIS NUMBER!" << endl << "Enter number again: " << endl;
        cin >> boxnum;
    }

    cout << endl << "YOU ARE ABOUT TO GAMBLE WITH BOX N.O " << boxnum << ", WITH A VALUE OF: " << allboxes[boxnum] << "$" << endl;
    cout << endl << "Here are the multipliers with values and odds:" << endl;
    cout << endl << "[1] 1.25x, " << allboxes[boxnum] << "$ ---> " << allboxes[boxnum] * 1.25 << "$, " << "70% possibility" << endl;
    cout << "[2] 1.5x, " << allboxes[boxnum] << "$ ---> " << allboxes[boxnum] * 1.5 << "$, " << "60% possibility" << endl;
    cout << "[3] 1.75x, " << allboxes[boxnum] << "$ ---> " << allboxes[boxnum] * 1.75 << "$, " << "50% possibility" << endl;
    cout << "[4] 2x, " << allboxes[boxnum] << "$ ---> " << allboxes[boxnum] * 2 << "$, " << "40% possibility" << endl;
    cout << "[5] 5x, " << allboxes[boxnum] << "$ ---> " << allboxes[boxnum] * 5 << "$, " << "30% possibility" << endl;
    cout << "[6] 10x, " << allboxes[boxnum] << "$ ---> " << allboxes[boxnum] * 10 << "$, " << "20% possibility" << endl;
    cout << "[7] 100x, " << allboxes[boxnum] << "$ ---> " << allboxes[boxnum] * 100 << "$, " << "10% possibility" << endl;

    cout << endl << "Enter a number from 1-7, to take corresponding odds:" << endl;
    int userbox;
    cin >> userbox;
    while (userbox > 7 || userbox < 1) {
        cout << "ENTER A NUMBER FROM 1-7!" << endl;
        cin >> userbox;
    }
    // Randomizer
    int r;
    switch (userbox) {
    case 1:
        r = 1 + rand() % 10;
        if (r <= 7 && r >= 1) {
            cout << "You box is now worth: " << allboxes[boxnum] * 1.25 << "$" << endl;
            allboxes[boxnum] = allboxes[boxnum] * 1.25;
        }
        else {
            cout << "You lost the gamble!" << endl;
            allboxes[boxnum] = 0;

        } break;
    case 2:
        r = 1 + rand() % 10;
        if (r <= 6 && r >= 1) {
            cout << "You box is now worth: " << allboxes[boxnum] * 1.5 << "$" << endl;
            allboxes[boxnum] = allboxes[boxnum] * 1.5;
        }
        else {
            cout << "You lost the gamble!" << endl;
            allboxes[boxnum] = 0;
        } break;
    case 3:
        r = 1 + rand() % 10;
        if (r <= 5 && r >= 1) {
            cout << "You box is now worth: " << allboxes[boxnum] * 1.75 << "$" << endl;
            allboxes[boxnum] = allboxes[boxnum] * 1.75;
        }
        else {
            cout << "You lost the gamble!" << endl;
            allboxes[boxnum] = 0;
        } break;
    case 4:
        r = 1 + rand() % 10;
        if (r <= 4 && r >= 1) {
            cout << "You box is now worth: " << allboxes[boxnum] * 2 << "$" << endl;
            allboxes[boxnum] = allboxes[boxnum] * 2;
        }
        else {
            cout << "You lost the gamble!" << endl;
            allboxes[boxnum] = 0;
        } break;
    case 5:
        r = 1 + rand() % 10;
        if (r <= 3 && r >= 1) {
            cout << "You box is now worth: " << allboxes[boxnum] * 5 << "$" << endl;
            allboxes[boxnum] = allboxes[boxnum] * 5;
        }
        else {
            cout << "You lost the gamble!" << endl;
            allboxes[boxnum] = 0;
        } break;
    case 6:
        r = 1 + rand() % 10;
        if (r <= 2 && r >= 1) {
            cout << "You box is now worth: " << allboxes[boxnum] * 10 << "$" << endl;
            allboxes[boxnum] = allboxes[boxnum] * 10;
        }
        else {
            cout << "You lost the gamble!" << endl;
            allboxes[boxnum] = 0;
        } break;
    case 7:
        r = 1 + rand() % 10;
        if (r <= 1 && r >= 1) {
            cout << "You box is now worth: " << allboxes[boxnum] * 100 << "$" << endl;
        }
        else {
            cout << "You lost the gamble!" << endl;
            allboxes[boxnum] = 0;
        } break;
    default: cout << endl << "INVALID" << endl;
    }

    cout << endl << "Would You like to gamble more? (PRESS '1' gamble more and '2' to not)" << endl;
    int mguser;
    cin >> mguser;
    if (mguser == 1) {
        return chosen(size, psize, pcounter, allboxes, names, scores);
    }
    else {
        cout << endl << "Would You like to see the value of your boxes? (PRESS '1' see boxes and '2' to SCORE)" << endl;
        int otuser;
        cin >> otuser;
        if (otuser == 1) {
            for (int counter = 1; counter <= size; counter++) {
                cout << "N.o " << counter << " box has a value of " << allboxes[counter] << "$" << endl;
            }
            cout << "Any chance You would like to gamble more? (PRESS '1' see boxes and '2' to see SCORE)" << endl;
            int rfuser;
            cin >> rfuser;
            if (rfuser == 1) {
                return chosen(size, psize, pcounter, allboxes, names, scores);
            }

        }
    } 
    score(size, psize, pcounter, allboxes, names, scores);
}

// The start and user input of boxes
int main()
{

    cout << "_____      ___    ___        ___ ______ _      ______" << endl;
    cout << "|          / \\     |\\       / | |   \\   |      |     " << endl;
    cout << "| ____    /   \\    | \\     /  | |___/   |      |_____" << endl;
    cout << "|    |   /_____\\   |  \\   /   | |    \\  |      |     " << endl;
    cout << "|    |  /       \\  |   \\_/    | |    /  |      |     " << endl;
    cout << "|____| /         \\ |          | |___/   |_____ |_____" << endl;

    settings();

}