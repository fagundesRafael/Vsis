import styles from "./Inserir.module.css";
import * as BsIcons from "react-icons/bs";
import * as IoIcons from "react-icons/io";
import * as GiIcons from "react-icons/gi";
import * as RiIcons from "react-icons/ri";
import * as FaIcons from "react-icons/fa";
import * as HiIcons from "react-icons/hi";
import * as SlIcons from "react-icons/sl";
import * as ImIcons from "react-icons/im";
import * as MdIcons from "react-icons/md";
import * as FiIcons from "react-icons/fi";
import * as BiIcons from "react-icons/bi";
import * as CgIcons from "react-icons/cg";

import { Link } from "react-router-dom";

const Inserir = () => {
  return (
    <div className={styles.general_container}>
      <h2><span> Escolha o tipo</span> de procedimento a ser inserido:</h2>
      <div className={styles.top_container} >
        <div className={styles.items_container}>
          <Link to='/inserir/parte'><span><BsIcons.BsPersonPlus/></span>PARTE</Link>
          <Link to='/novoinquerito'><span><SlIcons.SlDoc/></span>INQUÉRITO</Link>
          <Link to='#'><span><SlIcons.SlDoc/></span>T.C.</Link>
          <Link to='#'><span><FaIcons.FaChild/></span>PAAI/AAI</Link>
          <Link to='#'><span><HiIcons.HiOutlineDocumentText/></span>OFÍCIO</Link>
          <Link to='#'><span><RiIcons.RiPoliceCarFill/></span>O.M.</Link>
          <Link to='#'><span><ImIcons.ImWoman/></span>PROTETIVA</Link>
          <Link to='#'><span><FaIcons.FaStamp/></span>CERTIDÃO</Link>
          <Link to='#'><span><MdIcons.MdDocumentScanner/></span>REMESSA</Link>
          <Link to='#'><span><GiIcons.GiPoliceOfficerHead/></span>INTIMAÇÃO</Link>
          <Link to='#'><span><HiIcons.HiOutlineDocumentDuplicate/></span>JUNTADA</Link>
          <Link to='#'><span><GiIcons.GiPoliceBadge/></span>APREENSÃO</Link>
          <Link to='#'><span><FiIcons.FiPackage/></span>RESTITUIÇÃO</Link>
          <Link to='#'><span><BiIcons.BiPackage/></span>ENTREGA</Link>
          <Link to='#'><span><HiIcons.HiOutlineDocumentSearch/></span>APENSO</Link>
          <Link to='#'><span><BsIcons.BsFileEarmarkPerson/></span>TRANSLADO</Link>
          <Link to='#'><span><BiIcons.BiSpreadsheet/></span>PRECATÓRIA</Link>
          <Link to='#'><span><IoIcons.IoMdFingerPrint/></span>INDICIAMENTO</Link>
          <Link to='#'><span><GiIcons.GiPrisoner/></span>GUIA</Link>
          <Link to='#'><span><GiIcons.GiHandcuffs/></span>MANDADO</Link>
          <Link to='#'><span><MdIcons.MdAttachMoney/></span>FIANÇA</Link>
          <Link to='#'><span><CgIcons.CgMoreO/></span>OUTROS</Link>
        </div>
      </div>
      <div className={styles.botton_container} ></div>
    </div>
  );
};

export default Inserir;
