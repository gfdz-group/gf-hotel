import React from 'react';
import URI from 'urijs';

const APP_ID = 'wx86bd4d228059c896';

const withAuth = (Component) => {
  return class HOC extends Component {

    generateGetCodeUrl(redirectURL) {
      return new URI('https://open.weixin.qq.com/connect/oauth2/authorize')
        .addQuery("appid", APP_ID)
        .addQuery("redirect_uri", redirectURL)
        .addQuery("response_type", "code")
        .addQuery("scope", "snsapi_base")
        .addQuery("response_type", "code")
        .hash("wechat_redirect")
        .toString();
    }

    async callApi(code) {
      if (Boolean(code)) {
        const res = await fetch(`/api/hotel/hotelManager/getOpenId.do?code=${code}`, {
          method: 'GET',
          credentials: 'same-origin',
        });
        const body = await res.json();
        return body;
      }
    }

    componentWillMount() {
      const openId = localStorage.getItem('openId');
      if (!openId) {
        const uri = new URI(document.location.href);
        const query = uri.query(true);
        const {
          code
        } = query;
        if (!Boolean(code)) {
          document.location = this.generateGetCodeUrl(document.location.href);
        } else {
          this.callApi(code)
            .then(res => {
              localStorage.setItem('openId', res.openId);
            })
            .catch(err => { /** error handle */ });
        }
      }
    }

    render() {
      return <Component {...this.props}/>
    }
  }
}

export default withAuth;
