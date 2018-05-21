import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Router, Route, Switch } from 'react-router';
import classNames from 'classnames';
import { Layout, Icon, message, Affix } from 'antd';

const { Header, Content } = Layout;

import './index.scss';
import * as UTILS from '../data/utils/device_data';
import * as CONSTANTS from '../data/config/constants';
import * as pageActions from '../data/redux/page_details/actions';
import * as companyActions from '../data/redux/company_details/actions';

import AppHeader from '../components/appheader';
import HomePage from "./home";
import AboutUs from "./about_us";
import Footer from "../components/footer";
import OurCompanies from './our_companies';
import OurClients from './our_clients';
import ContactUs from './contact_us';
import CompanyPage from './company_page';
import ImageGrid from './gallery';

function mapStateToProps(state) {
    return {
        page_details: state.page_details,
        company_details: state.company_details
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Object.assign({}, pageActions, companyActions), dispatch)
    };
}

class AppContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false
        };
        this.props.history.listen(() => {
            window.scrollTo(0, 0);
        });
    }

    componentWillMount() {
        const systLang = UTILS.getLang();
        this.props.actions.setDeviceData(UTILS.checkDevice.deviceStatus());
        if (systLang) {
            this.props.actions.setLang(systLang);
        }
        this.timeout = false;
        this.props.actions.getCompanyDetails();
    }

    componentDidMount() {
        let self = this;
        window.addEventListener("resize", function () {
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                self.props.actions.setDeviceData(UTILS.checkDevice.deviceStatus());
            }, 300);
        });
        window.scrollTo(0, 0);
    }

    componentWillReceiveProps(nxtProps) {
        if (this.props.company_details.loaders !== nxtProps.company_details.loaders && nxtProps.company_details.loaders.get_company_details === CONSTANTS.statuses.LOAD_ERR) {
            message.warning("Cant fetch latest data! Please reload for latest data!");
        }
    }

    loadPath = (path) => {
        this.props.history.push(path);
    };

    render() {
        const { page_details, company_details, history } = this.props;

        if (company_details.loaders.get_company_details === CONSTANTS.statuses.LOADING) {
            return (
                <Layout className={classNames("flex-column flex-center full-width full-min-height AppContainer")}>
                    <Icon type="loading" className="font-xl" />
                </Layout>
            );
        }
        return (
            <Layout className={classNames("flex-column full-width full-min-height AppContainer")}>
                <Affix>
                    <Header className="AppHeaderContainer bg-white b-border is-no-pad" history={history}>
                        <AppHeader page_details={page_details} loadPath={this.loadPath} history={history} />
                    </Header>
                </Affix>
                <Layout className="AppContentContainer flex-column bg-white">
                    <Content className="AppContent flex-column full-flex">
                        <Router history={history}>
                            <Switch>
                                <Route exact path="/" component={HomePage} />
                                <Route exact path="/about_us" component={AboutUs} />
                                <Route exact path="/our_companies" component={OurCompanies} />
                                <Route exact path="/our_clients" component={OurClients} />
                                <Route exact path="/contact_us" component={ContactUs} />
                                <Route exact path="/gallery" component={ImageGrid} />
                                <Route path="/company_page">
                                    <Switch>
                                        <Route exact path="/company_page" component={CompanyPage} />
                                        <Route path="/company_page/:company_id" component={CompanyPage} />
                                    </Switch>
                                </Route>
                            </Switch>
                        </Router>
                    </Content>
                </Layout>
                <Footer actions={this.props.actions} company_details={company_details.main_company} loadPath={this.loadPath} history={history} />
            </Layout>
        );
    }
}

AppContainer.propTypes = {
    page_details: PropTypes.object,
    actions: PropTypes.object,
    history: PropTypes.object,
    company_details: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(AppContainer);
