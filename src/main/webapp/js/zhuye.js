	$.ajax({
		type: "post",
		url: "./dengluxianshi",      
		success: function (data,Status) {
			if(data==1){
			document.getElementById('view').innerHTML+=`
			<nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
			<!-- Brand and toggle get grouped for better mobile display -->
			<div class="navbar-header">
				<button type="button" class="navbar-toggle" data-toggle="collapse"
					data-target=".navbar-ex1-collapse">
					<span class="sr-only">Toggle navigation</span> <span
						class="icon-bar"></span> <span class="icon-bar"></span> <span
						class="icon-bar"></span>
				</button>
				<a class="navbar-brand" href="javascript:void(0)">信息查询</a>
			</div>
			<div class="collapse navbar-collapse navbar-ex1-collapse">
				<ul class="nav navbar-nav side-nav">
					<li><a href="fault.html" target="iframe1"><i class="fa fa-fw fa-edit"></i>
							提交故障</a></li>
					<li><a href="#" data-toggle="collapse" data-target="#demo"
						><i
							class="fa fa-fw fa-dashboard"></i> 纺机管理<i
							class="fa fa-fw fa-caret-down"></i></a>
						<ul id="demo" class="collapse">
							<li><a href="jiqi.html" target="iframe1">机器信息查询</a></li>
							<li><a href="main_machineinfo.html" target="iframe1">机器管理</a></li>
						</ul></li>

					<li><a href="javascript:;" data-toggle="collapse"
						data-target="#demo1"><i class="glyphicon glyphicon-zoom-in"></i>
							历史记录<i class="fa fa-fw fa-caret-down"></i></a>
						<ul id="demo1" class="collapse">
							<li><a href="recordlist.html" target="iframe1">故障记录</a></li>
							<li><a href="recordlist1.html" target="iframe1">保养记录</a></li>
							<li><a href="recordlist2.html"target="iframe1">领料记录</a></li>
						</ul></li>

					<li><a href="javascript:;" data-toggle="collapse"
						data-target="#demo2"><i class="glyphicon glyphicon-pencil"></i>
							用户权限 <i class="fa fa-fw fa-caret-down"></i></a>
						<ul id="demo2" class="collapse">
							<li><a href="permissions.html" target="iframe1">权限分配</a></li>
							<li><a href="updateuser.html"target="iframe1">权限管理</a></li>
						</ul></li>
					<li><a href="fault-review.html" target="iframe1"><i
							class="fa fa-fw fa-desktop"></i> 故障审核</a></li>

					<li><a href="picking2.html" target="iframe1"><i class="glyphicon glyphicon-list-alt"></i> 申请领料</a>
					<li><a href="board.html"  target="_blank"><i class="fa fa-fw fa-file"></i>进入看板</a>
					</li>
				</ul>
			</div>
		</nav>`
		}
		else if(data==2){
			document.getElementById('view').innerHTML+=`
				<nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
				<!-- Brand and toggle get grouped for better mobile display -->
				<div class="navbar-header">
					<button type="button" class="navbar-toggle" data-toggle="collapse"
						data-target=".navbar-ex1-collapse">
						<span class="sr-only">Toggle navigation</span> <span
							class="icon-bar"></span> <span class="icon-bar"></span> <span
							class="icon-bar"></span>
					</button>
					<a class="navbar-brand" href="javascript:void(0)">信息查询</a>
				</div>
				<div class="collapse navbar-collapse navbar-ex1-collapse">
					<ul class="nav navbar-nav side-nav">
						<li><a href="fault.html" target="iframe1"><i class="fa fa-fw fa-edit"></i>
								提交故障</a></li>
					<li><a href="#" data-toggle="collapse" data-target="#demo"
						><i
							class="fa fa-fw fa-dashboard"></i> 纺机管理<i
							class="fa fa-fw fa-caret-down"></i></a>
						<ul id="demo" class="collapse">
							<li><a href="jiqi.html" target="iframe1">机器信息查询</a></li>
							<li><a href="main_machineinfo.html" target="iframe1">机器管理</a></li>
						</ul></li>

						<li><a href="javascript:;" data-toggle="collapse"
							data-target="#demo1"><i class="glyphicon glyphicon-zoom-in"></i>
								历史记录<i class="fa fa-fw fa-caret-down"></i></a>
							<ul id="demo1" class="collapse">
								<li><a href="recordlist.html" target="iframe1">故障记录</a></li>
								<li><a href="recordlist1.html" target="iframe1">保养记录</a></li>
								<li><a href="recordlist2.html"target="iframe1">领料记录</a></li>
							</ul></li>
						<li><a href="fault-review.html" target="iframe1"><i
								class="fa fa-fw fa-desktop"></i> 故障审核</a></li>

						<li><a href="picking2.html" target="iframe1"><i class="glyphicon glyphicon-list-alt"></i> 申请领料</a>
						<li><a href="board.html"  target="_blank"><i class="fa fa-fw fa-file"></i>进入看板</a>
						</li>
					</ul>
				</div>
			</nav>`
			}
		else if(data==3){
			document.getElementById('view').innerHTML+=`
				<nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
				<!-- Brand and toggle get grouped for better mobile display -->
				<div class="navbar-header">
					<button type="button" class="navbar-toggle" data-toggle="collapse"
						data-target=".navbar-ex1-collapse">
						<span class="sr-only">Toggle navigation</span> <span
							class="icon-bar"></span> <span class="icon-bar"></span> <span
							class="icon-bar"></span>
					</button>
					<a class="navbar-brand" href="javascript:void(0)">信息查询</a>
				</div>
				<div class="collapse navbar-collapse navbar-ex1-collapse">
					<ul class="nav navbar-nav side-nav">
						<li><a href="fault.html" target="iframe1"><i class="fa fa-fw fa-edit"></i>
								提交故障</a></li>
						<li><a href="javascript:;" data-toggle="collapse"
							data-target="#demo1"><i class="glyphicon glyphicon-zoom-in"></i>
								历史记录<i class="fa fa-fw fa-caret-down"></i></a>
							<ul id="demo1" class="collapse">
								<li><a href="recordlist.html" target="iframe1">故障记录</a></li>
								<li><a href="recordlist1.html" target="iframe1">保养记录</a></li>
								<li><a href="recordlist2.html"target="iframe1">领料记录</a></li>
							</ul></li>
						<li><a href="fault-review.html" target="iframe1"><i
								class="fa fa-fw fa-desktop"></i> 故障审核</a></li>

						<li><a href="picking2.html" target="iframe1"><i class="glyphicon glyphicon-list-alt"></i> 申请领料</a>
						<li><a href="board.html"  target="_blank"><i class="fa fa-fw fa-file"></i>进入看板</a>
						</li>
					</ul>
				</div>
			</nav>`
			}
			else if(data==4){
				document.getElementById('view').innerHTML+=`
					<nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
					<!-- Brand and toggle get grouped for better mobile display -->
					<div class="navbar-header">
						<button type="button" class="navbar-toggle" data-toggle="collapse"
							data-target=".navbar-ex1-collapse">
							<span class="sr-only">Toggle navigation</span> <span
								class="icon-bar"></span> <span class="icon-bar"></span> <span
								class="icon-bar"></span>
						</button>
						<a class="navbar-brand" href="javascript:void(0)">信息查询</a>
					</div>
					<div class="collapse navbar-collapse navbar-ex1-collapse">
						<ul class="nav navbar-nav side-nav">
								
							<li><a href="fault.html" target="iframe1"><i class="fa fa-fw fa-edit"></i>
									提交故障</a></li>
						</ul>
					</div>
				</nav>`
				
			}
		}
	})