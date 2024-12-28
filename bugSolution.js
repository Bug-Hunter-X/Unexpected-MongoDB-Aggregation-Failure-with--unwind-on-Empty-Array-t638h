```javascript
const pipeline = [
  {
    $match: { userId: 'someUser' }
  },
  {
    $lookup: {
      from: 'orders',
      localField: '_id',
      foreignField: 'userId',
      as: 'userOrders'
    }
  },
  {
    $addFields: {
      userOrders: {
        $ifNull: ['$userOrders', []] //handle null cases
      }
    }
  },
  {
    $unwind: {
      path: '$userOrders',
      preserveNullAndEmptyArrays: true //handle empty arrays
    }
  }
];

db.users.aggregate(pipeline).toArray((err, result) => {
  if (err) {
    console.error('Aggregation failed:', err);
  } else {
    console.log('Aggregation result:', result);
  }
});
```