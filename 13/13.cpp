class Solution {
    public:
        int romanToInt(string s) {
            int ans = 0;
            
            for(int i=0;i<s.size();i++){
                if(s[i] == 'M'){
                    ans += 1000;
                }
                else if(s[i] == 'D'){
                    ans += 500;
                }
                else if(s[i] == 'C'){
                    ans += 100;
                }
                else if(s[i] == 'L'){
                    ans += 50;
                }
                else if(s[i] == 'X'){
                    ans += 10;
                }
                else if(s[i] == 'V'){
                    ans += 5;
                }
                else if(s[i] == 'I'){
                    ans += 1;
                }
    
                
            }
    
            if(s.find("IV") != string::npos ){
                ans -=2;
            }
    
            if(s.find("IX") != string::npos ){
                ans -=2;
            }
    
            if(s.find("XL") != string::npos ){
                ans -=20;
            }
    
            if(s.find("XC") != string::npos ){
                ans -=20;
            }
    
            if(s.find("CD") != string::npos ){
                ans -=200;
            }
    
            if(s.find("CM") != string::npos ){
                ans -=200;
            }
    
            return ans;
        }
    };