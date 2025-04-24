class Solution {
    public:
        string intToRoman(int num) {
            int ans[13] = {0};
            while(num >= 1000){ //M
                ans[0]++;
                num -=1000;
            }
    
            if(num < 1000 && num >= 900){ //CM
                ans[1]++;
                num -= 900;
            }
            else if(num < 500 && num >= 400){ //CD
                ans[2]++;
                num -= 400;
            }
            while(num >= 500){ //D
                ans[3]++;
                num -= 500;
            }
            while(num >= 100){//C
                ans[4]++;
                num -= 100;
            }
    
            if(num < 100 && num >= 90){ //XC
                ans[5]++;
                num -= 90;
            }
            else if(num < 50 && num >= 40){ //XL
                ans[6]++;
                num -= 40;
            }
            while(num >= 50){//L
                ans[7]++;
                num -= 50;
            }
            while(num >= 10){//X
                ans[8]++;
                num -= 10;
            }
    
            if(num == 9){ //IX
                ans[9]++;
                num -= 9;
            }
            else if(num == 4){ //IV
                ans[10]++;
                num -= 4;
            }
            while(num >= 5){//V
                ans[11]++;
                num -= 5;
            }
            while(num >= 1){//I
                ans[12]++;
                num -= 1;
            }
    
            string answer = "";
            for(int i=0;i<13;i++){
                for(int j=0; j < ans[i];j++){
                    if(i == 0){
                        answer+="M";
                    }
                    else if(i == 1){
                        answer+="CM";
                    }
                    else if(i == 2){
                        answer+="CD";
                    }
                    else if(i == 3){
                       answer+="D";
                    }
                    else if(i == 4){
                        answer+= "C";
                    }
                    else if(i == 5){
                       answer+= "XC";
                    }
                    else if(i == 6){
                        answer+= "XL";
                    }
                    else if(i == 7){
                        answer+= "L";
                    }
                    else if(i == 8){
                        answer+= "X";
                    }
                    else if(i == 9){
                        answer+= "IX";
                    }
                    else if(i == 10){
                        answer+= "IV";
                    }
                    else if(i == 11){
                        answer+= "V";
                    }
                    else {
                        answer+= "I";
                    }
                }
            }
            return answer;
    
        }
    };