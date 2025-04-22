import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  SafeAreaView,
  RefreshControl,
} from "react-native";
import React from "react";
import Post from "../jobcomponents/Post";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { logToLogBoxAndConsole } from "react-native-reanimated/lib/typescript/logger";
import { supabase } from "../../../lib/supabase";

const JobsPage = () => {
  const [jobs, setJobs] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);

  const fetchJobs = async () => {
    setLoading(true);
const { data, error } = await supabase
  .from("job_posts")
  .select(
    `
    post_id,
    title,
    location,
    pay_rate,
    start_date,
    end_date,
    description,
    available_positions,
    farmer_id,
    accounts:farmer_id (
      first_name,
      last_name
    )
  `
  )
  .order("created_at", { ascending: false });


    if (error) {
      console.error("Error fetching jobs:", error);
    } else {
      setJobs(data || []);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    fetchJobs();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchJobs();
    setRefreshing(false);
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../../assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {loading ? (
          <Text>Loading jobs...</Text>
        ) : jobs.length === 0 ? (
          <Text>No jobs available right now.</Text>
        ) : (
          jobs.map((job) => (
            <Post
              key={job.post_id}
              title={job.title}
              date={new Date(job.start_date).toLocaleDateString()}
              position={job.available_positions}
              location={job.location}
              pay={job.pay_rate}
              jobDescription={job.description}
              job_id={job.post_id}
              farmerName={`${job.accounts.first_name} ${job.accounts.last_name}`}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default JobsPage;

const styles = StyleSheet.create({
  scroll: {},
  imageContainer: {
    marginTop: 3,
    marginLeft: 110,
    marginBottom: -10,
  },
  logo: {
    width: 170,
    height: 70,
  },
});
