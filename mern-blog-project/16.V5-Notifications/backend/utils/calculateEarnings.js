const Earnings = require("../models/Earning/Earnings");
const Post = require("../models/Post/Post");

//Rate
const RATE_PER_VIEW = 0.01;
const calculateEarnings = async () => {
  //get the current date
  const currentDate = new Date();
  //Find all the posts (loop)
  const posts = await Post.find();

  for (const post of posts) {
    //Count new unique viewers since the last calculation
    const newViewsCount = post.viewers.length - post.lastCalculatedViewsCount;
    console.log(newViewsCount);
    //Calculate earnings based on the number of new unique views
    const earningsAmount = newViewsCount * RATE_PER_VIEW;
    console.log(earningsAmount);
    //Update this month earnings and total earnings
    post.thisMonthEarnings += earningsAmount;
    post.totalEarnings += earningsAmount;
    //Create the earning record
    await Earnings.create({
      user: post.author,
      post: post._id,
      amount: earningsAmount,
      calculatedOn: currentDate,
    });
    //Update the lastCalculatedViewsCount and nextEatningDate
    post.lastCalculatedViewsCount = post.viewers.length;
    post.nextEarningDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1
    );
    //Save the record
    await post.save();
  }
  //send the response (log)
  console.log("Earnings calculated...", posts);
};

module.exports = calculateEarnings;
