import * as React from 'react';
import { lazy } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { useCallback } from 'react';
import { useRef } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import List from '@mui/material/List';
import Tabs from '@mui/material/Tabs';
import Chip from '@mui/material/Chip';
import Menu from '@mui/material/Menu';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import Badge from '@mui/material/Badge';
import Popper from '@mui/material/Popper';
import Avatar from '@mui/material/Avatar';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import Skeleton from '@mui/material/Skeleton';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import ListItem from '@mui/material/ListItem';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { esES } from '@mui/x-data-grid';

import TextField from '@mui/material/TextField';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import CardContent from '@mui/material/CardContent';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import FormControlLabel from '@mui/material/FormControlLabel';
import CircularProgress from '@mui/material/CircularProgress';

//tables
import { DataGrid } from '@mui/x-data-grid';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { styled, darken, lighten } from '@mui/material/styles';
import { gridPageCountSelector, gridPageSelector, useGridApiContext, useGridSelector } from '@mui/x-data-grid';

//date pickers 
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';


//ICONOS DE MUI MATERIA
import FeedIcon from '@mui/icons-material/Feed';
import HotelIcon from '@mui/icons-material/Hotel';
import GroupsIcon from '@mui/icons-material/Groups';
import ListItemIcon from '@mui/material/ListItemIcon';
import PublishIcon from '@mui/icons-material/Publish';
import Logout from '@mui/icons-material/LogoutRounded';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import Settings from '@mui/icons-material/SettingsRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LanRoundedIcon from '@mui/icons-material/LanRounded';
import MailRoundedIcon from '@mui/icons-material/MailRounded';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';
import StopRoundedIcon from '@mui/icons-material/StopRounded';
import BuildRoundedIcon from '@mui/icons-material/BuildRounded';
import PlaceRoundedIcon from '@mui/icons-material/PlaceRounded';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import PublicRoundedIcon from '@mui/icons-material/PublicRounded';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import PregnantWomanIcon from '@mui/icons-material/PregnantWoman';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import PublishRoundedIcon from '@mui/icons-material/PublishRounded';
import AlarmOnRoundedIcon from '@mui/icons-material/AlarmOnRounded';
import SignpostRoundedIcon from '@mui/icons-material/SignpostRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import Wifi1BarRoundedIcon from '@mui/icons-material/Wifi1BarRounded';
import MoreTimeRoundedIcon from '@mui/icons-material/MoreTimeRounded';
import GroupAddRoundedIcon from '@mui/icons-material/GroupAddRounded';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import ArrowLeftRoundedIcon from '@mui/icons-material/ArrowLeftRounded';
import DomainAddRoundedIcon from '@mui/icons-material/DomainAddRounded';
import NewspaperRoundedIcon from '@mui/icons-material/NewspaperRounded';
import TimerOffOutlinedIcon from '@mui/icons-material/TimerOffOutlined';
import PsychologyRoundedIcon from '@mui/icons-material/PsychologyRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import ArrowRightRoundedIcon from '@mui/icons-material/ArrowRightRounded';
import ChildCareOutlinedIcon from '@mui/icons-material/ChildCareOutlined';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';
import PlagiarismRoundedIcon from '@mui/icons-material/PlagiarismRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import LocalPizzaOutlinedIcon from '@mui/icons-material/LocalPizzaOutlined';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import RequestQuoteRoundedIcon from '@mui/icons-material/RequestQuoteRounded';
import MapsHomeWorkRoundedIcon from '@mui/icons-material/MapsHomeWorkRounded';
import QuestionMarkRoundedIcon from '@mui/icons-material/QuestionMarkRounded';
import ContactPhoneRoundedIcon from '@mui/icons-material/ContactPhoneRounded';
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded';
import ScheduleSendRoundedIcon from '@mui/icons-material/ScheduleSendRounded';
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded';
import ChangeCircleRoundedIcon from '@mui/icons-material/ChangeCircleRounded';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import ManageHistoryRoundedIcon from '@mui/icons-material/ManageHistoryRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import AssignmentIndRoundedIcon from '@mui/icons-material/AssignmentIndRounded';
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded';
import HourglassFullRoundedIcon from '@mui/icons-material/HourglassFullRounded';
import ReportProblemRoundedIcon from '@mui/icons-material/ReportProblemRounded';
import EventAvailableRoundedIcon from '@mui/icons-material/EventAvailableRounded'
import ReduceCapacityRoundedIcon from '@mui/icons-material/ReduceCapacityRounded';
import SimCardDownloadRoundedIcon from '@mui/icons-material/SimCardDownloadRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import SpatialAudioOffOutlinedIcon from '@mui/icons-material/SpatialAudioOffOutlined';
import RunningWithErrorsRoundedIcon from '@mui/icons-material/RunningWithErrorsRounded';
import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded';
import ContentPasteSearchRoundedIcon from '@mui/icons-material/ContentPasteSearchRounded';
import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded';
import NotificationsActiveRoundedIcon from '@mui/icons-material/NotificationsActiveRounded';
import MiscellaneousServicesRoundedIcon from '@mui/icons-material/MiscellaneousServicesRounded';
import ConnectWithoutContactOutlinedIcon from '@mui/icons-material/ConnectWithoutContactOutlined';
import PrecisionManufacturingRoundedIcon from '@mui/icons-material/PrecisionManufacturingRounded';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';

//DrawerComponents Icons
import BrandAsanaIcon from '../Assets/DrawerComponentsIcons/BrandAsanaIcon';
import Approval from '../Assets/DrawerComponentsIcons/Approval';
import BarChartLine from '../Assets/DrawerComponentsIcons/BarChartLine';
import AddKPI from '../Assets/DrawerComponentsIcons/AddKPI';
import ThreeSquares from '../Assets/DrawerComponentsIcons/ThreeSquares';
import Goal2 from '../Assets/DrawerComponentsIcons/Goal2';
import ArrowGoal from '../Assets/DrawerComponentsIcons/ArrowGoal';

//componentes de antd design
import { Calendar } from 'antd';
import { Modal } from 'antd';
import { Divider } from 'antd';
import { notification } from 'antd';

import locale from 'antd/es/date-picker/locale/es_ES';




import Logotipo from '../Assets/Logo.png';
import Logo2 from '../Assets/Logo.png';
import LogoNavidad from '../Assets/LogoNavidad.png';
import Admin from '../Pages/Admin/Admin';
import Logs from '../Components/Logs/Logs';
import Imports from '../Components/Imports/Imports';
import Feeling from '../Components/MyFeeling/Feeling';
import Exports from '../Pages/Master/Exports';
import NotificationRecived from '../Components/Notifications/NotificationRecived';

const drawerWidth = 250;

export {
    React,
    lazy,
    axios,
    useCallback,
    useRef,
    //mui material
    Box,
    Chip,
    Grid,
    Tabs,
    Tab,
    Fade,
    List,
    Menu,
    Badge,
    Paper,
    AppBar,
    Popper,
    Drawer,
    Avatar,
    Toolbar,
    Tooltip,
    MenuIcon,
    MenuItem,
    Checkbox,
    Skeleton,
    ListItem,
    TextField,
    Container,
    PropTypes,
    IconButton,
    Typography,
    CssBaseline,
    CardContent,
    ListItemText,
    ListItemButton,
    FormControlLabel,
    CircularProgress,
    DataGrid,
    Pagination,
    PaginationItem,
    styled,
    darken,
    lighten,
    gridPageCountSelector,
    gridPageSelector,
    useGridApiContext,
    useGridSelector,
    Stack,
    InputLabel,
    Select,
    esES,

    //date pickers
    DatePicker,
    AdapterDayjs,
    LocalizationProvider,


    //iconos mui materila
    Logout,
    Settings,
    FeedIcon,
    HotelIcon,
    GroupsIcon,
    PublishIcon,
    ListItemIcon,
    NewspaperIcon,
    ExpandMoreIcon,
    AddRoundedIcon,
    LanRoundedIcon,
    MailRoundedIcon,
    DoneRoundedIcon,
    KeyOutlinedIcon,
    StopRoundedIcon,
    FileDownloadIcon,
    PublicRoundedIcon,
    GroupRoundedIcon,
    CheckRoundedIcon,
    CloseRoundedIcon,
    TuneRoundedIcon,
    PlaceRoundedIcon,
    GroupsRoundedIcon,
    PersonRoundedIcon,
    SearchRoundedIcon,
    BuildRoundedIcon,
    PregnantWomanIcon,
    FlightTakeoffIcon,
    EventAvailableIcon,
    AlarmOnRoundedIcon,
    PublishRoundedIcon,
    WarningRoundedIcon,
    GroupAddRoundedIcon,
    MoreTimeRoundedIcon,
    LanguageRoundedIcon,
    SettingsRoundedIcon,
    Wifi1BarRoundedIcon,
    SignpostRoundedIcon,
    NewspaperRoundedIcon,
    TimerOffOutlinedIcon,
    ArrowLeftRoundedIcon,
    DomainAddRoundedIcon,
    ArrowRightRoundedIcon,
    AccessTimeRoundedIcon,
    PsychologyRoundedIcon,
    EmojiFoodBeverageIcon,
    VisibilityRoundedIcon,
    ChildCareOutlinedIcon,
    PlagiarismRoundedIcon,
    CheckCircleRoundedIcon,
    BorderColorRoundedIcon,
    AddCircleOutlineRoundedIcon,
    EditRoundedIcon,
    LocalPizzaOutlinedIcon,
    ContactPhoneRoundedIcon,
    RequestQuoteRoundedIcon,
    QuestionMarkRoundedIcon,
    ScheduleSendRoundedIcon,
    ArrowBackIosRoundedIcon,
    FileDownloadRoundedIcon,
    RocketLaunchRoundedIcon,
    MapsHomeWorkRoundedIcon,
    ChangeCircleRoundedIcon,
    ReportProblemRoundedIcon,
    ManageHistoryRoundedIcon,
    AssignmentIndRoundedIcon,
    HourglassFullRoundedIcon,
    CalendarTodayRoundedIcon,
    CalendarMonthRoundedIcon,
    ReduceCapacityRoundedIcon,
    EventAvailableRoundedIcon,
    ArrowForwardIosRoundedIcon,
    SimCardDownloadRoundedIcon,
    SpatialAudioOffOutlinedIcon,
    RunningWithErrorsRoundedIcon,
    FiberManualRecordRoundedIcon,
    ContentPasteSearchRoundedIcon,
    AdminPanelSettingsRoundedIcon,
    NotificationsActiveRoundedIcon,
    MiscellaneousServicesRoundedIcon,
    ConnectWithoutContactOutlinedIcon,
    PrecisionManufacturingRoundedIcon,
    RemoveRedEyeRoundedIcon,
    BrandAsanaIcon,
    BarChartLine,
    Approval,
    AddKPI,
    ThreeSquares,
    Goal2,
    //componentes de antd
    Calendar,
    locale,
    Modal,
    Card,
    Divider,
    notification,
    ArrowGoal,

    //otros
    drawerWidth,
    useEffect,
    useState,
    useContext,
    Swal,
    Button,

    //Componentes
    Logotipo,
    Logo2,
    Admin,
    Logs,
    Imports,
    Feeling,
    Exports,
    LogoNavidad,
    NotificationRecived
};