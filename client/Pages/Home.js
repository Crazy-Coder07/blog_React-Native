import { View, Text, StyleSheet, ScrollView, RefreshControl} from 'react-native'
import React, { useContext,useCallback,useState,useEffect} from 'react'
import FooterMenu from '../Components/Menu/FooterMenu';
import { PostContext } from '../ContextApi/postContext';
import PostCard from '../Components/PostCard';

const Home = () => {
  const [posts,setPosts, getAllPosts] = useContext(PostContext);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setPosts(posts);
    getAllPosts();
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, [refreshing]);
   

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <PostCard posts={posts} />
      </ScrollView>
      <View style={{ backgroundColor: "#ffffff" }}>
        <FooterMenu />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    justifyContent: "space-between",
  },
});

export default Home;