#include <iostream>
using namespace std;

void game(int gameStatus);
int main();

void gameWin(int x) {

	if (x == 0) {
		cout << endl << "X WON" << endl;
		cout << endl << "X WON" << endl;
		cout << endl << "X WON" << endl;
		game(1);
	}
	if (x == 1) {
		cout << endl << "O WON" << endl;
		cout << endl << "O WON" << endl;
		cout << endl << "O WON" << endl;
		game(1);
	}
	if (x == 2) {
		cout << endl << "DRAW" << endl;
		cout << endl << "DRAW" << endl;
		cout << endl << "DRAW" << endl;
		game(1);
	}
}

void game(int gameStatus) {
	if (gameStatus > 0) {
		main();
	}
	string visual[9][3] = {
		{"   |", "   |", "   "}, //Spaces for visual
		{" 1 |", " 2 |", " 3 "}, //CHANGEABLE
		{"___|", "___|", "___"}, //Spaces for visual
		{"   |", "   |", "   "}, //Spaces for visual
		{" 4 |", " 5 |", " 6 "}, //CHANGEABLE
		{"___|", "___|", "___"}, //Spaces for visual
		{"   |", "   |", "   "}, //Spaces for visual
		{" 7 |", " 8 |", " 9 "}, //CHANGEABLE
		{"   |", "   |", "   "}  //Spaces for visual
	};

	int number = 0;
	int usedNumbers[9]{ 0, 0, 0, 0, 0, 0, 0, 0, 0 };
	int Xnums[5]{ 0, 0, 0, 0, 0 };
	int XwinCondition = 0;
	int XnumsCounter = 0;
	int OwinCondition = 0;
	int OnumsCounter = 0;
	int Onums[4]{ 0, 0, 0, 0};
	for (int counter = 1; counter <= 9; counter++) {
		if (counter % 2 == 0) {
			//O's turn
			cout << endl << "It is 'O's turn:" << endl;
			for (int fcounter = 1; fcounter > 0; fcounter++) {
				int sameNum = 0;
				int suitableNum = 0;
				cout << endl << "Enter number between 0-10:";
				cin >> number;
				while (number > 9 || number < 1) {
					cout << endl << "Enter number BETWEEN 0-10:";
					cin >> number;
				}
				//Checks for the same number in usedNumbers array
				for (int a = 0; a <= 8; a++) {
					if (number == usedNumbers[a]) {
						cout << endl << "This can not be done!" << endl;
						sameNum++;
						break;
					}
				}
				//Searches spot for the number in usedNumbers array
				for (int b = 0; b <= 8; b++) {
					if (sameNum == 1) {
						break;
					}
					if (usedNumbers[b] == 0) {
						usedNumbers[b] = number;
						suitableNum++;
						break;
					}
				}
				// If number is suitable it will end the infinitive loop
				if (suitableNum == 1) {
					break;
				}
			}
			Onums[OnumsCounter] = number;
			OnumsCounter++;
			int row = 0;
			int* ptrRow = &row;
			int column = 0;
			int* ptrColumn = &column;
			switch (number) {
			case 1: { visual[1][0] = " O |";
				for (; *ptrRow < 9; (*ptrRow)++) {
					cout << visual[*ptrRow][*ptrColumn];
					(*ptrColumn)++;
					cout << visual[*ptrRow][*ptrColumn];
					(*ptrColumn)++;
					cout << visual[*ptrRow][*ptrColumn] << endl;
					*ptrColumn = 0;
				}
				if (*ptrRow == 9) {
					*ptrRow = 0;
				}
			}break;
			case 2: { visual[1][1] = " O |";
				for (; *ptrRow < 9; (*ptrRow)++) {
					cout << visual[*ptrRow][*ptrColumn];
					(*ptrColumn)++;
					cout << visual[*ptrRow][*ptrColumn];
					(*ptrColumn)++;
					cout << visual[*ptrRow][*ptrColumn] << endl;
					*ptrColumn = 0;
				}
				if (*ptrRow == 9) {
					*ptrRow = 0;
				}
			}break;
			case 3: {visual[1][2] = " O ";
				for (; *ptrRow < 9; (*ptrRow)++) {
					cout << visual[*ptrRow][*ptrColumn];
					(*ptrColumn)++;
					cout << visual[*ptrRow][*ptrColumn];
					(*ptrColumn)++;
					cout << visual[*ptrRow][*ptrColumn] << endl;
					*ptrColumn = 0;
				}
				if (*ptrRow == 9) {
					*ptrRow = 0;
				}
			}break;
			case 4: {visual[4][0] = " O |";
				for (; *ptrRow < 9; (*ptrRow)++) {
					cout << visual[*ptrRow][*ptrColumn];
					(*ptrColumn)++;
					cout << visual[*ptrRow][*ptrColumn];
					(*ptrColumn)++;
					cout << visual[*ptrRow][*ptrColumn] << endl;
					*ptrColumn = 0;
				}
				if (*ptrRow == 9) {
					*ptrRow = 0;
				}
			}break;
			case 5: {visual[4][1] = " O |";
				for (; *ptrRow < 9; (*ptrRow)++) {
					cout << visual[*ptrRow][*ptrColumn];
					(*ptrColumn)++;
					cout << visual[*ptrRow][*ptrColumn];
					(*ptrColumn)++;
					cout << visual[*ptrRow][*ptrColumn] << endl;
					*ptrColumn = 0;
				}
				if (*ptrRow == 9) {
					*ptrRow = 0;
				}
			}break;
			case 6: {visual[4][2] = " O ";
				for (; *ptrRow < 9; (*ptrRow)++) {
					cout << visual[*ptrRow][*ptrColumn];
					(*ptrColumn)++;
					cout << visual[*ptrRow][*ptrColumn];
					(*ptrColumn)++;
					cout << visual[*ptrRow][*ptrColumn] << endl;
					*ptrColumn = 0;
				}
				if (*ptrRow == 9) {
					*ptrRow = 0;
				}
			}break;
			case 7: {visual[7][0] = " O |";
				for (; *ptrRow < 9; (*ptrRow)++) {
					cout << visual[*ptrRow][*ptrColumn];
					(*ptrColumn)++;
					cout << visual[*ptrRow][*ptrColumn];
					(*ptrColumn)++;
					cout << visual[*ptrRow][*ptrColumn] << endl;
					*ptrColumn = 0;
				}
				if (*ptrRow == 9) {
					*ptrRow = 0;
				}
			}break;
			case 8: { {visual[7][1] = " O |";
				for (; *ptrRow < 9; (*ptrRow)++) {
					cout << visual[*ptrRow][*ptrColumn];
					(*ptrColumn)++;
					cout << visual[*ptrRow][*ptrColumn];
					(*ptrColumn)++;
					cout << visual[*ptrRow][*ptrColumn] << endl;
					*ptrColumn = 0;
				}
				if (*ptrRow == 9) {
					*ptrRow = 0;
				}
				}break;
			case 9: { {visual[7][2] = " O ";
				for (; *ptrRow < 9; (*ptrRow)++) {
					cout << visual[*ptrRow][*ptrColumn];
					(*ptrColumn)++;
					cout << visual[*ptrRow][*ptrColumn];
					(*ptrColumn)++;
					cout << visual[*ptrRow][*ptrColumn] << endl;
					*ptrColumn = 0;
				}
				if (*ptrRow == 9) {
					*ptrRow = 0;
				}
				}break;
			}
			}
			}
		}
		else {
			//X's turn
			cout << endl << "It is 'X's turn:" << endl;
			for (int fcounter = 1; fcounter > 0; fcounter++) {
				int sameNum = 0;
				int suitableNum = 0;
				cout << endl << "Enter number between 0-10:";
				cin >> number;
				while (number > 9 || number < 1) {
					cout << endl << "Enter number BETWEEN 0-10:";
					cin >> number;
				}
				//Checks for the same number in usedNumbers array
				for (int a = 0; a <= 8; a++) {
					if (number == usedNumbers[a]) {
						cout << endl << "This can not be done!" << endl;
						sameNum++;
						break;
					}
				}
				//Searches spot for the number in usedNumbers array
				for (int b = 0; b <= 8; b++) {
					if (sameNum == 1) {
						break;
					}
					if (usedNumbers[b] == 0) {
						usedNumbers[b] = number;
						suitableNum++;
						break;
					}
				}
				// If number is suitable it will end the infinitive loop
				if (suitableNum == 1) {
					break;
				}
			}
			Xnums[XnumsCounter] = number;
			XnumsCounter++;
			int row = 0;
			int* ptrRow = &row;
			int column = 0;
			int* ptrColumn = &column;
			switch (number) {
			case 1: { visual[1][0] = " X |";
				for (; *ptrRow < 9; (*ptrRow)++) {
					cout << visual[*ptrRow][*ptrColumn];
					(*ptrColumn)++;
					cout << visual[*ptrRow][*ptrColumn];
					(*ptrColumn)++;
					cout << visual[*ptrRow][*ptrColumn] << endl;
					*ptrColumn = 0;
				}
				if (*ptrRow == 9) {
					*ptrRow = 0;
				}
			}break;
			case 2: { visual[1][1] = " X |";
				for (; *ptrRow < 9; (*ptrRow)++) {
					cout << visual[*ptrRow][*ptrColumn];
					(*ptrColumn)++;
					cout << visual[*ptrRow][*ptrColumn];
					(*ptrColumn)++;
					cout << visual[*ptrRow][*ptrColumn] << endl;
					*ptrColumn = 0;
				}
				if (*ptrRow == 9) {
					*ptrRow = 0;
				}
			}break;
			case 3: {visual[1][2] = " X ";
				for (; *ptrRow < 9; (*ptrRow)++) {
					cout << visual[*ptrRow][*ptrColumn];
					(*ptrColumn)++;
					cout << visual[*ptrRow][*ptrColumn];
					(*ptrColumn)++;
					cout << visual[*ptrRow][*ptrColumn] << endl;
					*ptrColumn = 0;
				}
				if (*ptrRow == 9) {
					*ptrRow = 0;
				}
			}break;
			case 4: {visual[4][0] = " X |";
				for (; *ptrRow < 9; (*ptrRow)++) {
					cout << visual[*ptrRow][*ptrColumn];
					(*ptrColumn)++;
					cout << visual[*ptrRow][*ptrColumn];
					(*ptrColumn)++;
					cout << visual[*ptrRow][*ptrColumn] << endl;
					*ptrColumn = 0;
				}
				if (*ptrRow == 9) {
					*ptrRow = 0;
				}
			}break;
			case 5: {visual[4][1] = " X |";
				for (; *ptrRow < 9; (*ptrRow)++) {
					cout << visual[*ptrRow][*ptrColumn];
					(*ptrColumn)++;
					cout << visual[*ptrRow][*ptrColumn];
					(*ptrColumn)++;
					cout << visual[*ptrRow][*ptrColumn] << endl;
					*ptrColumn = 0;
				}
				if (*ptrRow == 9) {
					*ptrRow = 0;
				}
			}break;
			case 6: {visual[4][2] = " X ";
				for (; *ptrRow < 9; (*ptrRow)++) {
					cout << visual[*ptrRow][*ptrColumn];
					(*ptrColumn)++;
					cout << visual[*ptrRow][*ptrColumn];
					(*ptrColumn)++;
					cout << visual[*ptrRow][*ptrColumn] << endl;
					*ptrColumn = 0;
				}
				if (*ptrRow == 9) {
					*ptrRow = 0;
				}
			}break;
			case 7: {visual[7][0] = " X |";
				for (; *ptrRow < 9; (*ptrRow)++) {
					cout << visual[*ptrRow][*ptrColumn];
					(*ptrColumn)++;
					cout << visual[*ptrRow][*ptrColumn];
					(*ptrColumn)++;
					cout << visual[*ptrRow][*ptrColumn] << endl;
					*ptrColumn = 0;
				}
				if (*ptrRow == 9) {
					*ptrRow = 0;
				}
			}break;
			case 8: { {visual[7][1] = " X |";
				for (; *ptrRow < 9; (*ptrRow)++) {
					cout << visual[*ptrRow][*ptrColumn];
					(*ptrColumn)++;
					cout << visual[*ptrRow][*ptrColumn];
					(*ptrColumn)++;
					cout << visual[*ptrRow][*ptrColumn] << endl;
					*ptrColumn = 0;
				}
				if (*ptrRow == 9) {
					*ptrRow = 0;
				}
				}break;
			case 9: { {visual[7][2] = " X ";
				for (; *ptrRow < 9; (*ptrRow)++) {
					cout << visual[*ptrRow][*ptrColumn];
					(*ptrColumn)++;
					cout << visual[*ptrRow][*ptrColumn];
					(*ptrColumn)++;
					cout << visual[*ptrRow][*ptrColumn] << endl;
					*ptrColumn = 0;
				}
				if (*ptrRow == 9) {
					*ptrRow = 0;
				}
				}break;
			}
			}
			}
		}
		// Win check condition
		for (int WinSwitchCounter = 1; WinSwitchCounter < 9; WinSwitchCounter++) {
			switch (WinSwitchCounter) {
			case 1: {
				for (int XWinNumsCounter = 0; XWinNumsCounter <= 4; XWinNumsCounter++) {
					if (Xnums[XWinNumsCounter] == 1 || Xnums[XWinNumsCounter] == 2 || Xnums[XWinNumsCounter] == 3) {
						XwinCondition++;
					}
					if (XwinCondition == 3) {
						gameWin(0);
					}
					if (XWinNumsCounter == 4) {
						XwinCondition = 0;
					}
				}
				for (int OWinNumsCounter = 0; OWinNumsCounter <= 3; OWinNumsCounter++) {
					if (Onums[OWinNumsCounter] == 1 || Onums[OWinNumsCounter] == 2 || Onums[OWinNumsCounter] == 3) {
						OwinCondition++;
					}
					if (OwinCondition == 3) {
						gameWin(1);
					}
					if (OWinNumsCounter == 3) {
						OwinCondition = 0;
					}
				}
			}break;
			case 2: {
				for (int XWinNumsCounter = 0; XWinNumsCounter <= 4; XWinNumsCounter++) {
					if (Xnums[XWinNumsCounter] == 4 || Xnums[XWinNumsCounter] == 5 || Xnums[XWinNumsCounter] == 6) {
						XwinCondition++;
					}
					if (XwinCondition == 3) {
						gameWin(0);
					}
					if (XWinNumsCounter == 4) {
						XwinCondition = 0;
					}
				}
				for (int OWinNumsCounter = 0; OWinNumsCounter <= 3; OWinNumsCounter++) {
					if (Onums[OWinNumsCounter] == 4 || Onums[OWinNumsCounter] == 5 || Onums[OWinNumsCounter] == 6) {
						OwinCondition++;
					}
					if (OwinCondition == 3) {
						gameWin(1);
					}
					if (OWinNumsCounter == 3) {
						OwinCondition = 0;
					}
				}
			}break;
			case 3: {
				for (int XWinNumsCounter = 0; XWinNumsCounter <= 4; XWinNumsCounter++) {
					if (Xnums[XWinNumsCounter] == 7 || Xnums[XWinNumsCounter] == 8 || Xnums[XWinNumsCounter] == 9) {
						XwinCondition++;
					}
					if (XwinCondition == 3) {
						gameWin(0);
					}
					if (XWinNumsCounter == 4) {
						XwinCondition = 0;
					}
				}
				for (int OWinNumsCounter = 0; OWinNumsCounter <= 3; OWinNumsCounter++) {
					if (Onums[OWinNumsCounter] == 7 || Onums[OWinNumsCounter] == 8 || Onums[OWinNumsCounter] == 9) {
						OwinCondition++;
					}
					if (OwinCondition == 3) {
						gameWin(1);
					}
					if (OWinNumsCounter == 3) {
						OwinCondition = 0;
					}
				}
			}break;
			case 4: {
				for (int XWinNumsCounter = 0; XWinNumsCounter <= 4; XWinNumsCounter++) {
					if (Xnums[XWinNumsCounter] == 1 || Xnums[XWinNumsCounter] == 4 || Xnums[XWinNumsCounter] == 7) {
						XwinCondition++;
					}
					if (XwinCondition == 3) {
						gameWin(0);
					}
					if (XWinNumsCounter == 4) {
						XwinCondition = 0;
					}
				}
				for (int OWinNumsCounter = 0; OWinNumsCounter <= 3; OWinNumsCounter++) {
					if (Onums[OWinNumsCounter] == 1 || Onums[OWinNumsCounter] == 4 || Onums[OWinNumsCounter] == 7) {
						OwinCondition++;
					}
					if (OwinCondition == 3) {
						gameWin(1);
					}
					if (OWinNumsCounter == 3) {
						OwinCondition = 0;
					}
				}
			}break;
			case 5: {
				for (int XWinNumsCounter = 0; XWinNumsCounter <= 4; XWinNumsCounter++) {
					if (Xnums[XWinNumsCounter] == 2 || Xnums[XWinNumsCounter] == 5 || Xnums[XWinNumsCounter] == 8) {
						XwinCondition++;
					}
					if (XwinCondition == 3) {
						gameWin(0);
					}
					if (XWinNumsCounter == 4) {
						XwinCondition = 0;
					}
				}
				for (int OWinNumsCounter = 0; OWinNumsCounter <= 3; OWinNumsCounter++) {
					if (Onums[OWinNumsCounter] == 2 || Onums[OWinNumsCounter] == 5 || Onums[OWinNumsCounter] == 8) {
						OwinCondition++;
					}
					if (OwinCondition == 3) {
						gameWin(1);
					}
					if (OWinNumsCounter == 3) {
						OwinCondition = 0;
					}
				}
			}break;
			case 6: {
				for (int XWinNumsCounter = 0; XWinNumsCounter <= 4; XWinNumsCounter++) {
					if (Xnums[XWinNumsCounter] == 3 || Xnums[XWinNumsCounter] == 6 || Xnums[XWinNumsCounter] == 9) {
						XwinCondition++;
					}
					if (XwinCondition == 3) {
						gameWin(0);
					}
					if (XWinNumsCounter == 4) {
						XwinCondition = 0;
					}
				}
				for (int OWinNumsCounter = 0; OWinNumsCounter <= 3; OWinNumsCounter++) {
					if (Onums[OWinNumsCounter] == 3 || Onums[OWinNumsCounter] == 6 || Onums[OWinNumsCounter] == 9) {
						OwinCondition++;
					}
					if (OwinCondition == 3) {
						gameWin(1);
					}
					if (OWinNumsCounter == 3) {
						OwinCondition = 0;
					}
				}
			}break;
			case 7: {
				for (int XWinNumsCounter = 0; XWinNumsCounter <= 4; XWinNumsCounter++) {
					if (Xnums[XWinNumsCounter] == 1 || Xnums[XWinNumsCounter] == 5 || Xnums[XWinNumsCounter] == 9) {
						XwinCondition++;
					}
					if (XwinCondition == 3) {
						gameWin(0);
					}
					if (XWinNumsCounter == 4) {
						XwinCondition = 0;
					}
				}
				for (int OWinNumsCounter = 0; OWinNumsCounter <= 3; OWinNumsCounter++) {
					if (Onums[OWinNumsCounter] == 1 || Onums[OWinNumsCounter] == 5 || Onums[OWinNumsCounter] == 9) {
						OwinCondition++;
					}
					if (OwinCondition == 3) {
						gameWin(1);
					}
					if (OWinNumsCounter == 3) {
						OwinCondition = 0;
					}
				}
			}break;
			case 8: {
				for (int XWinNumsCounter = 0; XWinNumsCounter <= 4; XWinNumsCounter++) {
					if (Xnums[XWinNumsCounter] == 3 || Xnums[XWinNumsCounter] == 5 || Xnums[XWinNumsCounter] == 7) {
						XwinCondition++;
					}
					if (XwinCondition == 3) {
						gameWin(0);
					}
					if (XWinNumsCounter == 4) {
						XwinCondition = 0;
					}
				}
				for (int OWinNumsCounter = 0; OWinNumsCounter <= 3; OWinNumsCounter++) {
					if (Onums[OWinNumsCounter] == 3 || Onums[OWinNumsCounter] == 5 || Onums[OWinNumsCounter] == 7) {
						OwinCondition++;
					}
					if (OwinCondition == 3) {
						gameWin(1);
					}
					if (OWinNumsCounter == 3) {
						OwinCondition = 0;
					}
				}
			}break;
			default: {
				gameWin(2);
			}
			}
		}

	}
}

int main() {

	cout << endl << "TIC TAC TOE GAME(Enter corresponding number to place Your letter):" << endl;
	cout << "   |   |   " << endl;
	cout << " 1 | 2 | 3 " << endl;
	cout << "___|___|___" << endl;
	cout << "   |   |   " << endl;
	cout << " 4 | 5 | 6 " << endl;
	cout << "___|___|___" << endl;
	cout << "   |   |   " << endl;
	cout << " 7 | 8 | 9 " << endl;
	cout << "   |   |   " << endl;
	game(0);

}