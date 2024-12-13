import { Grid, Menu } from "antd";
import navigationConfig from "configs/NavigationConfig";
import { NAV_TYPE_SIDE, SIDE_NAV_LIGHT } from "constants/ThemeConstant";
import { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { onMobileNavToggle } from "redux/actions/Theme";
import Icon from "../util-components/Icon";
import IntlMessage from "../util-components/IntlMessage";

const { SubMenu } = Menu;
const { useBreakpoint } = Grid;

const setLocale = (isLocaleOn, localeKey) =>
  isLocaleOn ? <IntlMessage id={localeKey} /> : localeKey.toString();

const setDefaultOpen = (key) => {
  let keyList = [];
  let keyString = "";
  if (key) {
    const arr = key.split("-");
    for (let index = 0; index < arr.length; index++) {
      const elm = arr[index];
      index === 0 ? (keyString = elm) : (keyString = `${keyString}-${elm}`);
      keyList.push(keyString);
    }
  }
  return keyList;
};

const SideNavContent = ({ sideNavTheme, routeInfo, localization }) => {
  const [openKeys, setOpenKeys] = useState(setDefaultOpen(routeInfo?.key));

  const onOpenChange = (keys) => {
    setOpenKeys(keys);
  };

  return (
    <Menu
      theme={sideNavTheme === SIDE_NAV_LIGHT ? "light" : "dark"}
      mode="inline"
      style={{ height: "100%", borderRight: 0 }}
      defaultSelectedKeys={[routeInfo?.key]}
      openKeys={openKeys}
      onOpenChange={onOpenChange}
    >
      {navigationConfig.map((menu) =>
        Array.isArray(menu.submenu) && menu.submenu.length > 0 ? (
          <SubMenu
            key={menu.key}
            title={
              <>
                {menu.icon && <Icon type={menu.icon} />}
                {setLocale(localization, menu.title)}
              </>
            }
            expandIcon={({ isOpen }) => (
              <Icon type={isOpen ? "arrow-up" : "arrow-down"} />
            )}
          >
            {menu.submenu.map((subMenu) =>
              Array.isArray(subMenu.submenu) && subMenu.submenu.length > 0 ? (
                <SubMenu
                  key={subMenu.key}
                  title={setLocale(localization, subMenu.title)}
                  expandIcon={({ isOpen }) => (
                    <Icon type={isOpen ? "arrow-up" : "arrow-down"} />
                  )}
                >
                  {subMenu.submenu.map((item) => (
                    <Menu.Item key={item.key}>
                      <Link to={item.path}>
                        {item.icon && <Icon type={item.icon} />}
                        {setLocale(localization, item.title)}
                      </Link>
                    </Menu.Item>
                  ))}
                </SubMenu>
              ) : (
                <Menu.Item key={subMenu.key}>
                  <Link to={subMenu.path}>
                    {subMenu.icon && <Icon type={subMenu.icon} />}
                    {setLocale(localization, subMenu.title)}
                  </Link>
                </Menu.Item>
              )
            )}
          </SubMenu>
        ) : (
          <Menu.Item key={menu.key}>
            <Link to={menu.path}>
              {menu.icon && <Icon type={menu.icon} />}
              {setLocale(localization, menu.title)}
            </Link>
          </Menu.Item>
        )
      )}
    </Menu>
  );
};

const TopNavContent = (props) => {
  const { topNavColor, localization } = props;
  return (
    <Menu mode="horizontal" style={{ backgroundColor: topNavColor }}>
      {navigationConfig.map((menu) =>
        menu.submenu.length > 0 ? (
          <SubMenu
            key={menu.key}
            popupClassName="top-nav-menu"
            title={
              <span>
                {menu.icon ? <Icon type={menu?.icon} /> : null}
                <span>{setLocale(localization, menu.title)}</span>
              </span>
            }
          >
            {menu.submenu.map((subMenuFirst) =>
              subMenuFirst.submenu.length > 0 ? (
                <SubMenu
                  key={subMenuFirst.key}
                  icon={
                    subMenuFirst.icon ? (
                      <Icon type={subMenuFirst?.icon} />
                    ) : null
                  }
                  title={setLocale(localization, subMenuFirst.title)}
                >
                  {subMenuFirst.submenu.map((subMenuSecond) => (
                    <Menu.Item key={subMenuSecond.key}>
                      <span>
                        {setLocale(localization, subMenuSecond.title)}
                      </span>
                      <Link to={subMenuSecond.path} />
                    </Menu.Item>
                  ))}
                </SubMenu>
              ) : (
                <Menu.Item key={subMenuFirst.key}>
                  {subMenuFirst.icon ? (
                    <Icon type={subMenuFirst?.icon} />
                  ) : null}
                  <span>{setLocale(localization, subMenuFirst.title)}</span>
                  <Link to={subMenuFirst.path} />
                </Menu.Item>
              )
            )}
          </SubMenu>
        ) : (
          <Menu.Item key={menu.key}>
            {menu.icon ? <Icon type={menu?.icon} /> : null}
            <span>{setLocale(localization, menu?.title)}</span>
            {menu.path ? <Link to={menu.path} /> : null}
          </Menu.Item>
        )
      )}
    </Menu>
  );
};

const MenuContent = (props) => {
  return props.type === NAV_TYPE_SIDE ? (
    <SideNavContent {...props} />
  ) : (
    <TopNavContent {...props} />
  );
};

const mapStateToProps = ({ theme }) => {
  const { sideNavTheme, topNavColor } = theme;
  return { sideNavTheme, topNavColor };
};

export default connect(mapStateToProps, { onMobileNavToggle })(MenuContent);
