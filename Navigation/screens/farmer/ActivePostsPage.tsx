import { StyleSheet, Text, View, Image, ScrollView, RefreshControl } from "react-native";
import React, { useEffect } from "react";
import FarmerPost from "../jobcomponents/FarmerPost";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../../FarmerStackNav";
import { supabase } from "../../../lib/supabase";

type NavigationProp = NativeStackNavigationProp<StackParamList>;

const ActivePostsPage = () => {
    const [posts, setPosts] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [refreshing, setRefreshing] = React.useState(false);
    const [farmerName, setFarmerName] = React.useState<{
      first_name: string;
      last_name: string;
    } | null>(null);

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

            if (farmerError) {
            console.error("Error fetching farmer name:", farmerError);
            } else {
            setFarmerName(farmerData);
            }
            const { data, error } = await supabase
                .from("job_posts")                .select("*")
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
    const navigation = useNavigation<NavigationProp>();
//fix ugly title for the page
//fix inconsistent spacing and also logo 
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.imageContainer}>
          <Image
            source={require("../../../assets/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        
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
              avaliable_positions={post.available_positions}
              location={post.location}
              title = {post.title}
              pay={post.pay_rate}
              jobDescription={post.description}
              navigation={navigation}
              farmerName={
                farmerName
                  ? `${farmerName.first_name} ${farmerName.last_name}`
                  : ""
              }
            />
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default ActivePostsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scroll: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 50,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  logo: {
    width: 170,
    height: 70,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#2D5015",
    marginBottom: 20,
  },
  centeredText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#555",
  },
});

