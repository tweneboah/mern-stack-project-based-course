const asyncHandler = require("express-async-handler");
const Earnings = require("../../models/Earning/Earnings");

const earningsController = {
  //!list all earnings
  fetchAllEarnings: asyncHandler(async (req, res) => {
    let earnings = await Earnings.aggregate([
      {
        $group: {
          _id: "$user",
          totalAmount: { $sum: "$amount" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $sort: { totalAmount: -1 },
      },
    ]);

    //Add a rank field to each document
    earnings = earnings.map((earning, index) => {
      return {
        ...earning,
        rank: index + 1,
      };
    });
    res.json({
      status: "success",
      message: "Earnings fetched successfully",
      earnings,
    });
  }),
};

module.exports = earningsController;
