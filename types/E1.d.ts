declare namespace sm.E1
{
	
	interface E1SubUser extends sm.sm_user_base,tb.kxyk_e1_lower_level
	{
		
		vip_name?:string
		
		s_count:number
		
		o_count:number
		
		c_count:number
	}
	
	
	type E1UserApplyVips = tb.kxyk_user_vip_set_apply 
	& Pick<tb.sm_user ,"nickname"> 
	& {
		
		e_name:tb.kxyk_mch_role_info['name'],
		v_name:tb.kxyk_mch_type_vips['name']
	}

	
	type applyVipsCommission = tb.kxyk_mch_role_e2e3_auth_config 
		& Pick<tb.kxyk_mch_type_vips,"price"> 
		& Pick<tb.kxyk_mch_role_info,"E4_income"|'name'>

    
	interface E1db{
		
		
		cid:number
		
		CarType:CarType[]
		
		E1:E1Info | false
		
		is_err:boolean
		
		scom:sm.ScanCom
		
		h:number
		
		pop_box:sm.Com.PopBoxPageDb
		
		is_auth:boolean
		
		count_1:number
		
		count_2:number
		
		is_show_reg_code:boolean

		SearchUser:SearchUser
		
		api:sm.rList
		
		api1:sm.rList
		
		api3:sm.rList<sm.E1.E1SubUser>
		
		data:{
			
			open:boolean,
		}
		
		give_vip:{
			
			open:boolean
			
			is_apply:boolean
			
			user:any
			
			list:tb.kxyk_mch_type_vips[]
		}
		
		sDate:sm.SelectDatePar
		
		api2:sm.rList
		
		money_checkout:number
		[x:string]:any
	}
    
    interface E2list extends tb.kxyk_mch_role_e2e3_auth
    {
        
        name:string
        
        address:string
        
        img:string
        
        goods_count:number
        
        item_count:number

    }
    
    interface E1Info extends tb.kxyk_mch_role_info
    {
        
		c_name:string
        
		avatar:string
		
		E2list?:E2list[]
		
		E3?:tb.kxyk_mch_role_e2e3_auth
    }
}