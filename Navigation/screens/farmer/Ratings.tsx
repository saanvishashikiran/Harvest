import { StyleSheet, Text, View, Image, ScrollView, RefreshControl } from "react-native";
import React, { useEffect } from "react";
import RatingPost from "../ratingComponents/RatingPost";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../../FarmerStackNav";
import { supabase } from "../../../lib/supabase";
type NavigationProp = NativeStackNavigationProp<StackParamList>;

const Ratings = () => {
 const [posts, setPosts] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = async () => {
        setRefreshing(true);
        await fetchJobPosts();
        setRefreshing(false);
    };
    const fetchJobPosts = async () => {
            const { data: {user}, error: userError } = await supabase.auth.getUser();
                if (userError) {
                    console.error("Error fetching userID:", userError);
                    return;
                }
            
            const farmerId = user?.id;
            const { data: farmerData, error: farmerError } = await supabase
            .from("accounts")
            .select("first_name, last_name")
            .eq("uuid", farmerId)
            .single();

            const { data, error } = await supabase
                .from("job_posts")                .select("*")
                .eq("farmer_id", farmerId)
                .order("created_at", { ascending: false });;
            if (error) {
                console.error("Error fetching job posts:", error);
            } else {
                setPosts(data);
            }
            setLoading(false);
            
        };
        useEffect(() => {
            fetchJobPosts();}, []);
    const navigation = useNavigation<NavigationProp>();
  return (
    <View style={styles.container}>
      <View style={styles.image}>
        <Image
          source={require("../../../assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <ScrollView contentContainerStyle={styles.scroll}        
                  refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }>
        {loading ? (
          <Text style={{ textAlign: "center" }}>Loading jobs...</Text>
        ) : posts.length === 0 ? (
          <Text style={{ textAlign: "center" }}>
            You haven’t posted any jobs yet.
          </Text>
        ) : (
          posts.map((post) => (
            <RatingPost
              key={post.post_id}
              date={new Date(post.start_date).toLocaleDateString()}
              available_positions={post.available_positions}
              location={post.location}
              title={post.title}
              pay={post.pay_rate}
              jobDescription={post.description}
              navigation={navigation}
              post_id={post.post_id}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
};
export default Ratings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  image: {
    marginTop: 50,
    marginLeft: 110,
    marginBottom: 20,
    width: 178,
    height: 40,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
  },
  logo: {
    width: 170,
    height: 70,
    marginBottom: 0,
    marginTop: -10,
  },
});
