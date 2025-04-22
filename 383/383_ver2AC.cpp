class Solution {
    public:
        bool canConstruct(string ransomNote, string magazine) {
           int characterList[26] = {0};
           for(int i=0;i<magazine.size();i++){
                for(int j=0;j<26;j++){
                    if(magazine[i] == 'a'+j ){
                        characterList[j]++;
                        break;
                    }
                }
           }
    
           for(int i=0;i<ransomNote.size();i++){
                characterList[ransomNote[i]-'a']--;
           }
    
           for(int i=0;i<26;i++){
                if(characterList[i] < 0){
                    return false;
                }
           }
           return true;
            
        }
    };