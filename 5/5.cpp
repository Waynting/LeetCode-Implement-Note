class Solution {
    public:
        double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
            size_t fullsize = nums1.size() + nums2.size();
            size_t point1 = 0, point2 = 0;
            vector<int> ans;
            while(point1 != nums1.size() && point2 != nums2.size()){
                if(nums1[point1] > nums2[point2]){
                    ans.push_back(nums2[point2]);
                    point2++;
                }
                else if(nums1[point1] < nums2[point2]){
                    ans.push_back(nums1[point1]);
                    point1++;
                }
                else{
                    ans.push_back(nums1[point1]);
                    ans.push_back(nums2[point2]);
                    point1++;
                    point2++;
                }
            }
    
            while(point1 != nums1.size()){
                ans.push_back(nums1[point1]);
                point1++;
            }
    
            while(point2 != nums2.size()){
                ans.push_back(nums2[point2]);
                point2++;
            }
            
            /*
            for(int i=0;i<fullsize;i++){
                cout << ans[i]<<endl;
            }*/
    
            double median;
            if(fullsize %2 == 1){
                median = ans[(fullsize-1)/2];
                
            }
            else{
                median = static_cast<double>( (ans[fullsize/2] + ans[(fullsize/2) -1]) ) /2;
        
            }
            return median;
    
        }
    };