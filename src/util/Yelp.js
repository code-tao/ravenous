const apiKey = 'zwLfwonA0R64OtJLVcJ2uC46Gjpsd6Ol6Ku3ldcEU0Yd_vhFGJNTeRf5_fo9AckGIkeeeqKpFmkW0lr9VoByDqG6we2-hPXvBOvhz3Dce5xFe3AgUwTRYcz6iZMTYnYx';

/* J's Raven
 key = zwLfwonA0R64OtJLVcJ2uC46Gjpsd6Ol6Ku3ldcEU0Yd_vhFGJNTeRf5_fo9AckGIkeeeqKpFmkW0lr9VoByDqG6we2-hPXvBOvhz3Dce5xFe3AgUwTRYcz6iZMTYnYx
*/
const Yelp = {
  search(term, location, sortBy) {
    return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`
      }
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if (jsonResponse.businesses) {
        return jsonResponse.businesses.map(business => ({
            'id': business.id,
            'imageSrc': business.image_url,
            'name': business.name,
            'address': business.location.address1,
            'city': business.location.city,
            'state': business.location.state,
            'zipCode': business.location.zip_code,
            'category': business.categories[0].title,
            'rating': business.rating,
            'reviewCount': business.review_count
          }));
      }
    })
  }
}

export default Yelp;
