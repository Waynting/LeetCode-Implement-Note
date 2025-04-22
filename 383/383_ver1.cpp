class Solution {
    public:
        bool canConstruct(string ransomNote, string magazine) {
           
            for(int i=0;i<ransomNote.size();i++){
                bool stop = false;
                for(int j=0;j<magazine.size();j++){
                    if(ransomNote[i] == magazine[j]){
                        magazine.erase(j,1);
                        stop = true;
                        break;
                    }
                }
                if(!stop){
                    return false;
                }
            }
            return true;
        }
    };