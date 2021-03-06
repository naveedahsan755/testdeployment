const handler = async (req, res) => {
  if (req.method === 'GET') {
  } else {
    res.status(404).end('Page Not Found');
  }
  try {
    if (!req.headers.authorization) throw new Error('Please Login');
    const { username } = jwt.verify(
      req.headers.authorization.split(' ')[1],
      process.env.SECRET_KEY
    );

    const user = await User.findOne({ where: { username } });
    if (!user) {
      throw new Error('Please Login');
    }

    if (!user.token) throw new Error('Please Login');

    const rating = user.avgRating;
    const views = user.totalViews;
    let following = await user.getFollower();
    let followed = await user.getFollowed();
    following = following.length;
    followed = followed.length;
    const about = user.about;
    const picture = user.picture;
    const vids = await Video.findAll({ where: { UserId: user.id } });
    const accessible = user.accessible;
    const videos = vids.map((vid) => vid.name);

    let response = {};

    if (user.accountType === 'Business') {
      const businessId = user.BusinessId;
      let testimonials = await Testimonial.findAll({
        where: { BusinessId: businessId }
      });
      testimonials = testimonials.map((testimonial) => {
        return {
          clientName: testimonial.clientName,
          testimonial: testimonial.testimonial,
          createdAt: testimonial.createdAt
        };
      });
      const findBusinessCard = await BusinessCard.findOne({
        where: { BusinessId: businessId }
      });
      response = {
        username,
        rating,
        views,
        following,
        followed,
        about,
        accessible,
        picture,
        videos,
        testimonials,
        businessCard: {
          ownderName: findBusinessCard ? findBusinessCard.ownerName : null,
          email: findBusinessCard ? findBusinessCard.email : null,
          phone: findBusinessCard ? findBusinessCard.phoneNumber : null,
          website: findBusinessCard ? findBusinessCard.website : null
        }
      };
    } else {
      response = {
        username,
        rating,
        views,
        following,
        followed,
        about,
        accessible,
        picture,
        videos
      };
    }

    res.status(200).json({
      message: 'success',
      data: response
    });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

export default handler;
