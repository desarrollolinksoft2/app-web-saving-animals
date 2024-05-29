'use Client'
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import pathNavigator from "../tools/navs/path_navigator"

const Frm_web = (props) => {
    const route = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const setMenu=(e,path)=>{
        e.preventDefault()
        route.replace(path)
    }

    return (<>

        <div className="o_home_menu mt-10">
            <div className="container">
                <div role="listbox" className="o_apps row user-select-none mt-5 mx-0">

                    <div className="col-3 col-md-2 o_draggable mb-3 px-0">
                        <a role="option" className="o_app o_menuitem d-flex flex-column rounded-3 justify-content-start align-items-center w-100 p-1 p-md-2" id="result_app_5" aria-selected="false" data-menu-xmlid="contacts.menu_contacts" onClick={(e)=>setMenu(e,'?menu=con')} href="#">
                            <img className="o_app_icon rounded-3" src="data:image/png;base64,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" />
                            <div className="o_caption w-100 text-center text-truncate mt-2">
                                {/* Ventas */}
                                {/* <Link href={'/web?menu=3&config=vnt'} > */}
                                Contactos
                                {/* </Link> */}
                            </div>
                        </a>
                    </div>
                    
                    {/*
                    <div className="col-3 col-md-2 o_draggable mb-3 px-0">
                        <a role="option" className="o_app o_menuitem d-flex  flex-column rounded-3 justify-content-start align-items-center w-100 p-1 p-md-2" id="result_app_6" aria-selected="false" data-menu-xmlid="sale.sale_menu_root" onClick={(e)=>setMenu(e,'?menu=ven')} href="#">
                            <img className="o_app_icon rounded-3" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAALySURBVHgB7d29ahRRGMbx58x+IORro0RBDNlYRIv4AemsAqLRyrUTbLayXe9gNwqmMBBSBRQMFoKd2GmM6CV4CbmEdEoyO69nsqCI4I5hZueZyfMjTcKkyP5zztk5Z9kFRERERERERsuhxOzdcvwXNsKxegeRteCsCXMN5MdqK5+Cf11QRUkd7NzCIdBxsJ6PMYhg/P9/pQwS7qzEj/wrs6hdtEmgdEEOP96GmXX9cGijgAKUTBgF8z5GFwVVuiCVICxsjFjpgvgV4xoKrHRBfJLrKLASBik2BSGjIGQUhIyCkFEQMgpCRkHIKAgZBSFDs/1uvY1GVD/smLlluHj7w451she+fYk0VB7MIQ8UQfpr652+9Xt+H6oxOE8ynFS5BwnXnm/7A6U25Eiua0j/2XrXD4Y25Jfcgnxf22ha/AIE+UNuQSoW9iB/yS9IwU/2spJbEP88qtAne1nRjSEZBSGjIGQUhIyCkFEQMgpCRkHI/Pdu71br6bJzaPmW9/ztXRPH9OLNZ6Th0cObKJPEQbZbvcZBUO2a4fHgJyf3zCJLiYIcxXDVLz6GtjsylmgNORoZ2nsaiaFBtlq95u9pSrI2fIS4ag8yMkmmLJ1bjNDQIE5rx0jpxpCMgpBREDIKQkZByCgIGQUhoyBkFISMgpBREDIKQkZByCgIGQUhoyBkFISMgpBREDIKQkZByCgIGQUhoyBkFISMgpBREDIKQkZByCgIGQUhoyBkFISMgpBREDKFDnJmehyZaNSRCYdvwy4peJAJZMFN15AFF5U8yNLVi8hCsJjJJ3xbxSpPhl1U2CCLl2cxMXYKaXNxjLHU3xLf/Nequ/thb9iFhQxy2q8dN5YWkDY3P+5HxxRSZgZ7XVvZXU1yceE+vjseGalPVbUA7soUgoVJpMjgbN8irNbv7G4m/aUkQXJ/Y6x4apqbnUHzwgzOn5tGKnwE+MXbnT2F4NLk4Ps0+Aj+EdtDhPfVH+Gmu/91HyIiIiIiIsR+AsmgihQyBSQXAAAAAElFTkSuQmCC" />
                            <div className="o_caption w-100 text-center text-truncate mt-2">
                            Ventas
                            </div>
                        </a>
                    </div>
                     */}

                    {/*
                    <div className="col-3 col-md-2 o_draggable mb-3 px-0">
                        <a role="option" className="o_app o_menuitem d-flex flex-column rounded-3 justify-content-start align-items-center w-100 p-1 p-md-2" id="result_app_8" aria-selected="false" data-menu-xmlid="point_of_sale.menu_point_root" href="#menu_id=398&action_id=611">
                            <img className="o_app_icon rounded-3" src="data:image/png;base64,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" />
                            <div className="o_caption w-100 text-center text-truncate mt-2">
                                Punto de venta
                            </div>
                        </a>
                    </div>
                    */}

                    <div className="col-3 col-md-2 o_draggable mb-3 px-0">
                        <a role="option" className="o_app o_menuitem d-flex flex-column rounded-3 justify-content-start align-items-center w-100 p-1 p-md-2" id="result_app_10" aria-selected="false" data-menu-xmlid="account.menu_finance" onClick={(e)=>setMenu(e,'?menu=fac')} href="#">
                            <img className="o_app_icon rounded-3" src="data:image/png;base64,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" />
                            <div className="o_caption w-100 text-center text-truncate mt-2">
                                Facturación / Contabilidad
                            </div>
                        </a>
                    </div>

                    {/*
                    <div className="col-3 col-md-2 o_draggable mb-3 px-0">
                        <a role="option" className="o_app o_menuitem d-flex flex-column rounded-3 justify-content-start align-items-center w-100 p-1 p-md-2" id="result_app_14" aria-selected="false" data-menu-xmlid="stock.menu_stock_root" onClick={(e)=>setMenu(e,'?menu=inv')} href="#">
                            <img className="o_app_icon rounded-3" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAUGSURBVHgB7Z3PbxtFFMff7DopgR4qDsAJ3CIQcIE7ByLTArlF/AGpySXqiYpjBe1u+QOgp9zIhjMCSxyCWhSKxIVbJRBSA5ItJKQK8aNNmya1d+d1Js5GaRvXO/tj9k3yPlESy3ac2J/M933XkscADMMwDMMwDMMwdhHgOJsr7zUbfrKk7kjPT/xQzHzXA4dxVgh+M30sPjr5IUgMHrjAE0Ej9pZdFeOkkP7Kqbbw8TNAcWy/y9Wd6qqvYePdy8vgGE4JGaycnAZfXACE6SzX12J86bdcWi1OCNHxNHiy8bkAcRpyIARErswX8kIGV95RK0KeHRVPWdFDHz0RTZy6HAJhyArR8aQeQN2emlAC+PcW4K+39PeuBxBOLq2RnC/khKQ1NuucGAcOJMAvt0CurT9wvhAYSTkIp6JeDwhBRsjIGlvkNq+vg1SrArSUEVdR8yWUsr9MRQwJIeNqrCk6nuTP/wJsxFl/hEyM1SrEtMaOA5UAVCK0kJx0EfutOldLLUKK1thHbk9H0vXbIFVEPSaeMlPnfLEupKwam4LdO8M5kT2estLTxy9HvlizWpOtCamwxkJV3JFPwY933+r+M3gmXOicszJfKhdiq8aWSR8n4Ld7r6nPV9XpyeGZKsZQJuGZTtCDCqlMSE01tjB/9F+Ea1uvq9VxdL+Ld2pyvFyVmEqEEKixxtyIn90WcSN+LsO1sSvQryTGShVCsMaORcfTta03tuPJHFQ1OWmVuVpKEUK9xo5CS9CrYndO5KXE+VJYiEM1dhcdTz/dfXPUnMgJqposooWvPy5Uk3MLcbXGahHZ5kReis2XBuTFEz+UkXe11djKEMdRyCV1wrKQEiBQY8lRixB6NZYOVoXQr7H1Y0WIczW2RioX4m6NrYdqhSgJ27OiIuzUWLvU2rLyYrfG2sU5Ia7VWFOcEeJqjTWFvBDXa6wppIUchBprCkkhB6nGmkJOyOrGNPw5eB4OKx4Q47/kaTjMkBNy2GEhxGAhxGAhxGAhxGAhxGAhxGAhxGAhxGAhxGAhxGAhxGAhxGAhxGAhxGAhxGAhxGAhxGAhxGAhxGAhxGAhxGAhxGAhxGAhxGAhxCgiBIEZRe7HJrcQlDCP25veM3vA4Q5B+DbkpPjmMysnA/TEnLqh449cuBFD8u1fYMJX6+87+TIEZeJ/QLx0pvNJoc1nCs+QiZnvg0T6LZQYweGMMQSBS09gfKKoDE2pG5jp/RV9L1nd2SFIHPAVgurjqvpyUYm4CiVR6gt2poZvB3FCb/Gn1t75fWPMfVDFwE0PvbMLnXNfQslUUnsnZ65EOsbk7YFewgcpxtS8xlDHUxUyNNVvE9t+pQkgLwgBp7P8PqKRtRNP8byz28Q+zGb7pbYQ4jyMiTFiQnSN7amMmi9zTjwO61uNb7ZfDtRqmYMRYqgIKavGmmL9qZOpaC1A9Frqvy4CmvOl1BprSq1vV6HnixByFdKaDLWukEpqrCkk3tBl73ypQUilNdYUEs/2TkW/RzsxZrsmV15jTSGxQvayOBs01fFq5pqcE2s11hRyQlIWZy+qGPNVjGGZR/vWa6wpZIWkLM5+qmqyN1dUTF011hTyQjQFY0zX2OiITD76oBPcBOI4ISRFixFiQtVkbML4v51EjTXFKSEpY+YLqRpripNCNMMY89Pjl/R+DGssJJdciKf9cFZIyu58AXiBYo1lGIZhGIZhGIahzn0LTSWMXT2aBAAAAABJRU5ErkJggg==" />
                            <div className="o_caption w-100 text-center text-truncate mt-2">
                            Inventario
                            </div>
                        </a>
                    </div>
                    */}

                    <div className="col-3 col-md-2 o_draggable mb-3 px-0">
                        <a role="option" className="o_app o_menuitem d-flex flex-column rounded-3 justify-content-start align-items-center w-100 p-1 p-md-2" id="result_app_18" aria-selected="false" data-menu-xmlid="base.menu_administration" onClick={(e)=>setMenu(e,'?menu=aju')} href="#">
                            <img className="o_app_icon rounded-3" src="data:image/png;base64,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" />
                            <div className="o_caption w-100 text-center text-truncate mt-2">
                                Ajustes
                            </div>
                        </a>
                    </div>
                    
                </div>
            </div>
        </div>

    {/*
    <div className="flex justify-center items-center">
        <div className="">
            <h4>Menu</h4>
            <div className="flex gap-5">
            <div>
            <Link href={'/web?menu=2&config=alm'} >
                Almacen
            </Link>
            </div>
            <div>
            <Link href={'/web?menu=3&config=vnt'} >
                Ventas
            </Link>
            </div>
            </div>
            
        </div>
    </div>
     */}

    </>)
}

export default Frm_web