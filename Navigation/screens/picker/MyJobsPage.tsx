import { StyleSheet, Text, View, Image, ScrollView, RefreshControl } from "react-native";
import React from "react";
import PagePost from "../jobcomponents/PagePost";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../../../lib/supabase";

const MyJobsPage = () => {

  const [jobs, setJobs] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const fetchAcceptedJobs = async () => {
    setLoading(true);
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) return;

    const { data, error } = await supabase
      .from("job_applications")
      .select(
        `
job_posts (
  post_id,
  title,
  location,
  pay_rate,
  start_date,
  description,
  available_positions,
  farmer_id,
  accounts:farmer_id (
    first_name,
    last_name
  )
),
status

      `
      )
      .eq("picker_id", user.id)
      .eq("status", "accepted");

    if (error) {
      console.error("Error fetching accepted jobs:", error);
    } else {
      const jobsWithPosts = data
        .map((app: any) => ({
          ...app.job_posts,
        }))
        .filter((j: any) => j?.post_id);

      setJobs(jobsWithPosts);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    fetchAcceptedJobs();
  }, []);
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchAcceptedJobs();
    setRefreshing(false);
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <View style={styles.image}>
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
          <Text style={styles.centeredText}>Loading...</Text>
        ) : jobs.length === 0 ? (
          <Text style={styles.centeredText}>
            You have not been accepted for any jobs yet.
          </Text>
        ) : (
          jobs.map((job) => (
            <PagePost
              key={job.post_id}
              title={job.title}
              date={new Date(job.start_date).toLocaleDateString()}
              position={job.available_positions}
              location={job.location}
              pay={job.pay_rate}
              jobDescription={job.description}
              farmerName={`${job.accounts.first_name} ${job.accounts.last_name}`}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyJobsPage;

const styles = StyleSheet.create({
  centeredText: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
    color: "#444",
  },
  image: {
    flex: 1,
    marginTop: 3,
    marginLeft: 110,
    marginBottom: 60,
    width: 178,
    height: 40,
  },
  logo: {
    width: 170,
    height: 70,
    marginBottom: 0,
  },
});
