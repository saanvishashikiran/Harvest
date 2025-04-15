import { StyleSheet, Text, View, Image, ScrollView, RefreshControl } from 'react-native';
import React, { useEffect } from "react"
import FarmerPost from "../jobcomponents/FarmerPost"
import { supabase } from "../../lib/supabase";

const ActivePostsPage = () => {
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
                console.error("Error fetching user:", userError);
                return;
            }
        
        const farmerId = user?.id;
        const { data, error } = await supabase
            .from("job_posts")
            .select("*")
            .eq("farmer_id", farmerId)
            .order("created_at", { ascending: false });;
        if (error) {
            console.error("Error fetching job posts:", error);
        } else {
            console.log("Fetched job posts:", data);
            setPosts(data);
        }
        setLoading(false);
    };
    useEffect(() => {
        fetchJobPosts();}, []);
        
    return (
      <View>
        <View style={styles.image}>
          <Image
            source={require("../../assets/logo.png")}
            style={styles.logo}
          />
        </View>
        <ScrollView contentContainerStyle={{ paddingBottom: 60 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {loading ? (
            <Text style={{ textAlign: "center" }}>Loading jobs...</Text>
          ) : posts.length === 0 ? (
            <Text style={{ textAlign: "center" }}>
              You haven’t posted any jobs yet.
            </Text>
          ) : (
            posts.map((post) => (
              <FarmerPost
                key={post.post_id}
                date={new Date(post.start_date).toLocaleDateString()}
                position={post.available_positions}
                location={post.location}
                pay={post.pay_rate}
                jobDescription={post.description}
              />
            ))
          )}
        </ScrollView>
      </View>
    );
}

export default ActivePostsPage;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    marginTop: 63,
    marginLeft: 110,
    marginBottom: 60,
    width: 178,
    height: 40,
  },
  logo: {
    width: 150,
    height: 50,
    resizeMode: "contain",
    marginBottom: 20,
    alignSelf: "center",
  },
  scroll: {},
});