package com.xinyiSystem.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.xinyiSystem.pojo.admin;
import com.xinyiSystem.pojo.parts;
import com.xinyiSystem.pojo.photo;

@Mapper
public interface photoMapper {
	@Select("select count(*) from photo")
	public int findCount();
	@Select("select * from photo where photo_name ='${photo_name}' and photo_paren='${photo_paren}'")
	public List<photo> selectALL(@Param(value="photo_name") String photo_name,@Param(value="photo_paren") String photo_paren);
	@Insert("INSERT INTO xinyidatabase.photo (photo_id, photo_name, photo_paren, photo_path) VALUES (#{photo_id},#{photo_name},#{photo_paren}, #{photo_path});")
	public void insert(photo photo);
	@Update("update xinyidatabase.photo set  photo_path='${photo_path}' where photo_id = '${photo_id}'")
	public void update(@Param(value="photo_id")int photo_id,@Param(value="photo_path")String photo_path);
	@Select("select * from photo where photo_name ='${photo_name}'")
	public List<photo> selectById(@Param(value="photo_name") String photo_name);
}
